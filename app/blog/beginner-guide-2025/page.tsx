import { Metadata } from 'next';
import Link from 'next/link';
import { InArticleAd } from '@/components/AdSense';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

export const metadata: Metadata = {
    title: '유니온 + 링크부터 200레벨 초고속 육성까지! 완벽 내실 가이드 - Maple AI 블로그',
    description: '메이플스토리 유니온 6000, 링크스킬, 아티팩트까지! 200레벨 4-6시간 달성하는 초고속 육성법과 내실 완벽 가이드.',
    keywords: '메이플스토리, 유니온, 링크스킬, 200레벨, 빠른육성, 아티팩트, 유니온 6000, 메이플 내실',
};

export default function BeginnerGuidePage() {
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
                    <div className="inline-block px-3 py-1 bg-maple-orange/20 text-maple-orange text-xs sm:text-sm font-bold rounded-full mb-4">
                        유니온 & 육성 가이드
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
                        유니온 + 링크부터 200레벨 초고속 육성까지!<br className="hidden sm:block" /> 완벽 내실 가이드 2025
                    </h1>
                    <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>2025년 12월 11일</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>20분 읽기</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* Introduction */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6 mb-8">
                            <p className="text-lg text-slate-200 leading-relaxed mb-0">
                                메이플스토리에서 <strong className="text-white">진정한 스펙의 시작</strong>은 내실입니다!
                                유니온, 링크스킬, 아티팩트만 제대로 갖춰도 <strong className="text-orange-400">무과금으로도 막강한 캐릭터</strong>를 만들 수 있습니다.
                                이 가이드는 유니온 6000 달성부터 200레벨 4-6시간 육성까지, 모든 것을 담았습니다.
                            </p>
                        </div>
                    </section>

                    {/* Section 1: 내실의 중요성 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">💎</span>
                            1. 메이플 내실이 왜 중요할까?
                        </h2>

                        <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-orange-400 mb-4">내실의 3대장</h3>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">🔗 링크스킬</h4>
                                    <p className="text-slate-300 text-sm">
                                        다른 캐릭터의 스킬을<br />내 메인에 적용
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">⚔️ 유니온 공격대</h4>
                                    <p className="text-slate-300 text-sm">
                                        캐릭터 레벨 합산으로<br />스탯 & 효과 증가
                                    </p>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">💠 유니온 아티팩트</h4>
                                    <p className="text-slate-300 text-sm">
                                        미션으로 보석 강화<br />보공/크뎀 대폭 증가
                                    </p>
                                </div>
                            </div>
                            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
                                <p className="text-yellow-400 font-bold mb-2">📊 실제 효과 (유니온 6000 + 아티팩트 Lv.20 기준)</p>
                                <ul className="text-slate-300 space-y-1 text-sm">
                                    <li>• <strong className="text-white">보스 공격력 40%↑</strong> (아티팩트 단독)</li>
                                    <li>• <strong className="text-white">크리티컬 데미지 15%↑</strong></li>
                                    <li>• <strong className="text-white">방어율 무시 20%↑</strong></li>
                                    <li>• <strong className="text-white">올스탯 +수천</strong> (유니온 배치)</li>
                                </ul>
                                <p className="text-orange-300 text-xs mt-3">
                                    💡 <strong>본섭 내실이 챌린저스 서버 버프보다 강력합니다!</strong>
                                </p>
                            </div>
                        </div>

                        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">🎯 목표 설정</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <span className="text-green-400 font-bold">초급:</span>
                                    <div className="flex-1">
                                        <strong className="text-white">유니온 2000</strong>
                                        <p className="text-slate-400 text-xs mt-1">200레벨 10캐릭 / 기본 효과 체감</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-blue-400 font-bold">중급:</span>
                                    <div className="flex-1">
                                        <strong className="text-white">유니온 6000</strong>
                                        <p className="text-slate-400 text-xs mt-1">200레벨 30캐릭 / 본격 스펙 시작</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-purple-400 font-bold">고급:</span>
                                    <div className="flex-1">
                                        <strong className="text-white">유니온 8000+</strong>
                                        <p className="text-slate-400 text-xs mt-1">200레벨 40캐릭 / 최종 목표</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: 육성 준비물 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">🎒</span>
                            2. 육성 준비물 - 1~2억으로 완벽 세팅!
                        </h2>

                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-green-400 mb-4">💰 저자본 템세팅 (총 1~2억 메소)</h3>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-3">📿 장신구 세팅</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. <strong className="text-yellow-400">경매장</strong>에서 저렴한 장신구 4종 구매</li>
                                        <li>2. <strong className="text-blue-400">악세서리 공격력 주문서 100%</strong> 떡작</li>
                                        <li>3. 스타포스: 펜던트 <strong className="text-orange-400">10성</strong>, 나머지 <strong className="text-white">5성</strong></li>
                                    </ol>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-3">🛡️ 방어구 세팅</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. 모자, 상의, 75제 망토 구매</li>
                                        <li>2. <strong className="text-blue-400">방어구 공격력 주문서 70%</strong> + 놀긍혼 60%작</li>
                                        <li>3. 스타포스 <strong className="text-white">5성씩</strong></li>
                                    </ol>
                                    <p className="text-yellow-400 text-xs mt-2">
                                        💡 공격력 증가 무관, 업횟 소모용으로 사용!
                                    </p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-3">⚡ 소비템 준비</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li>• <strong className="text-white">경험치 3배 쿠폰</strong> (이벤트 획득)</li>
                                        <li>• <strong className="text-white">추가 경험치 50%</strong></li>
                                        <li>• <strong className="text-white">VIP 부스터</strong></li>
                                        <li>• <strong className="text-yellow-400">황금 딸기 농장 이용권</strong> (핵심!)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                📝 캐릭터 슬롯 미리 늘리기
                            </h4>
                            <p className="text-slate-300 text-sm">
                                데일리 기프트나 코인샵을 통해 슬롯을 미리 확보하고 캐릭터를 생성하세요.
                                유니온 6000 목표라면 <strong className="text-orange-400">최소 30슬롯</strong> 필요!
                            </p>
                        </div>
                    </section>

                    {/* AdSense Ad - After Section 2 */}
                    <InArticleAd
                        dataAdSlot="8162808816"
                        className="mb-12"
                    />

                    {/* Section 3: 200레벨 육성 빌드 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">🚀</span>
                            3. 1~200레벨 초고속 육성 빌드 (4-6시간 달성!)
                        </h2>

                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-purple-400 mb-4">📌 초반 구간 (Lv.30 ~ Lv.100)</h3>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">Lv.30 ~ Lv.60 (30분)</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. <strong className="text-yellow-400">테마파크</strong>로 이동 (리에나 해협 대화만 하고 넘어가기)</li>
                                        <li>2. <strong className="text-blue-400">골드비치 퀘스트</strong> 완료</li>
                                    </ol>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">Lv.60 ~ Lv.80 (40분)</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. <strong className="text-yellow-400">레벤 광산 스토리</strong> 진행</li>
                                        <li>2. 택시 활용해서 빠르게 이동</li>
                                        <li>3. <strong className="text-green-400">연합의 의지 퀘스트</strong> 클리어</li>
                                    </ol>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">Lv.85 ~ Lv.100 (1시간)</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. <strong className="text-yellow-400">마가티아 메인 퀘스트</strong> 진행</li>
                                        <li>2. 드랭의 집 비밀번호: '<strong className="text-orange-400">내 사랑</strong>' 입력</li>
                                        <li>3. 스토리 완료 후 101레벨 달성</li>
                                    </ol>
                                    <p className="text-blue-400 text-xs mt-2">
                                        💡 팁: 퀘스트 중 NPC 대화는 스페이스바로 빠르게 스킵 가능!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-xl p-6 mb-8">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4">📌 중반 구간 (Lv.100 ~ Lv.140)</h3>

                            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                                <p className="text-yellow-300 font-bold mb-2">🍓 두 가지 빌드 중 선택!</p>
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-white font-semibold mb-1">빌드 A: 5딸농</p>
                                        <p className="text-slate-400">황금 딸기 농장 5회 사용</p>
                                    </div>
                                    <div className="bg-slate-900/50 rounded-lg p-3">
                                        <p className="text-white font-semibold mb-1">빌드 B: VIP 부스터</p>
                                        <p className="text-slate-400">사냥터에서 직접 레벨업</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-2">VIP 부스터 빌드 (추천!)</h4>
                                    <ol className="space-y-2 text-sm text-slate-300">
                                        <li>1. 사냥터에서 <strong className="text-yellow-400">120~125레벨</strong> 달성</li>
                                        <li>2. <strong className="text-blue-400">시련의 동굴</strong>로 이동</li>
                                        <li>3. VIP 부스터 + 경험치 쿠폰 사용</li>
                                        <li>4. 140레벨까지 사냥</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-red-400 mb-4">🔥 후반 구간 (Lv.140 ~ Lv.200) - 최종 스퍼트!</h3>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-3">1단계: 템세팅 보강 (스타포스 80 충족)</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li>• <strong className="text-yellow-400">루타비스 방어구</strong> (5성씩)</li>
                                        <li>• 100제 장갑/신발 착용</li>
                                        <li>• 총 스타포스 <strong className="text-orange-400">80 이상</strong> 확보</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-white font-bold mb-3">2단계: 커닝타워 사냥 (140~165)</h4>
                                    <ol className="space-y-1 text-sm text-slate-300">
                                        <li>1. <strong className="text-blue-400">커닝타워 2층 카페</strong>로 이동</li>
                                        <li>2. VIP 부스터 사용</li>
                                        <li>3. <strong className="text-yellow-400">163~165레벨</strong>까지 사냥</li>
                                    </ol>
                                </div>

                                <div className="bg-gradient-to-r from-yellow-900/30 to-green-900/30 rounded-lg p-4 border border-yellow-500/30">
                                    <h4 className="text-yellow-300 font-bold mb-3 flex items-center gap-2">
                                        <span>🍓</span>
                                        3단계: 황금 딸기 농장 마무리 (165~200)
                                    </h4>
                                    <p className="text-slate-300 text-sm mb-2">
                                        남은 <strong className="text-white">딸기 농장 이용권 3회</strong>를 사용하여 200레벨 달성!
                                    </p>
                                    <p className="text-green-400 text-sm font-bold">
                                        ⏱️ 약 1시간 소요로 200레벨 완성! 🎉
                                    </p>
                                </div>

                                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                                    <h4 className="text-purple-300 font-bold mb-2">💡 익스트림 성장의 비약이 있다면?</h4>
                                    <p className="text-slate-300 text-sm">
                                        <strong className="text-white">140~179 구간</strong>을 익성비로 넘기는 것이 <strong className="text-orange-400">가장 빠릅니다!</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* AdSense Ad - After Section 3 */}
                    <InArticleAd
                        dataAdSlot="6849727140"
                        className="mb-12"
                    />

                    {/* Section 4: 육성 우선순위 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">🎯</span>
                            4. 어떤 캐릭터부터 키워야 할까? (육성 우선순위)
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-red-400 mb-4">🥇 1순위 (필수!)</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">⚔️ 전투 링크스킬</h4>
                                        <p className="text-slate-300 mb-2">데미지, 보공 관련 링크스킬</p>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• <strong className="text-orange-400">데몬슬레이어</strong> (보공 +10%)</li>
                                            <li>• <strong className="text-purple-400">데몬어벤져</strong> (데미지 +10%)</li>
                                            <li>• <strong className="text-blue-400">아크</strong> (데미지 +11%)</li>
                                            <li>• <strong className="text-cyan-400">일리움</strong> (데미지 +10%)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">💫 전투 유니온</h4>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• <strong className="text-yellow-400">은월</strong> (크리티컬 확률)</li>
                                            <li>• <strong className="text-green-400">메르세데스</strong> (쿨타임 감소)</li>
                                            <li>• <strong className="text-blue-400">메카닉</strong> (버프 지속시간)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">🎲 크리티컬 확률</h4>
                                        <ul className="text-slate-400 space-y-1">
                                            <li>• <strong className="text-orange-400">신궁</strong></li>
                                            <li>• <strong className="text-purple-400">나이트로드</strong></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-yellow-900/20 to-amber-900/20 border border-yellow-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-yellow-400 mb-4">🥈 1.5순위</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-start gap-2">
                                        <span className="text-purple-400">•</span>
                                        <div>
                                            <strong className="text-white">제로</strong>
                                            <p className="text-slate-400 text-xs">경험치 +10% (육성 난이도 높음)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-blue-400">•</span>
                                        <div>
                                            <strong className="text-white">모험가 마법사/도적</strong>
                                            <p className="text-slate-400 text-xs">링크 효율 좋으나 3캐릭 다 키워야 함</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5: 유니온 아티팩트 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">💠</span>
                            5. 유니온 아티팩트 완벽 가이드
                        </h2>

                        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-500/30 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-purple-400 mb-3">📚 아티팩트란?</h3>
                            <p className="text-slate-300 text-sm mb-4">
                                게임 내 활동(보스 처치, 사냥 등)으로 <strong className="text-white">미션을 완료</strong>하고
                                <strong className="text-yellow-400"> 보석을 성장</strong>시켜 능력치를 얻는 시스템입니다.
                            </p>
                            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                                <p className="text-blue-300 font-bold mb-2">⚡ 레벨업 팁</p>
                                <p className="text-slate-300 text-sm">
                                    챌린저스 서버 등에서 깬 <strong className="text-yellow-400">스페셜 미션</strong>(보스 처치 등)은
                                    본섭 리프 시 <strong className="text-green-400">한 번에 적용</strong>되어 빠른 레벨업이 가능합니다!
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-green-400 mb-4">⚙️ 추천 세팅 (아티팩트 Lv.20 기준)</h3>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-red-400 font-bold mb-2">🔴 필수 옵션 (반드시!)</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li>• <strong className="text-white">데미지</strong></li>
                                        <li>• <strong className="text-orange-400">보스 데미지</strong> (최우선!)</li>
                                        <li>• <strong className="text-yellow-400">크리티컬 데미지</strong></li>
                                    </ul>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <h4 className="text-blue-400 font-bold mb-2">🔵 선택 옵션 (상황에 따라)</h4>
                                    <ul className="space-y-1 text-sm text-slate-300">
                                        <li>• <strong className="text-white">방어율 무시</strong> (중요!)</li>
                                        <li>• <strong className="text-cyan-400">크리티컬 확률</strong></li>
                                        <li>• <strong className="text-green-400">올스탯</strong></li>
                                        <li>• <strong className="text-purple-400">공격력/마력</strong></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-900/10 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="text-lg font-bold text-yellow-400 mb-3 flex items-center gap-2">
                                💡 보석 배치 효율 팁
                            </h4>
                            <div className="space-y-2 text-sm text-slate-300">
                                <p>
                                    <strong className="text-white">5레벨 보석 1개</strong>보다
                                    <strong className="text-green-400"> 3~4레벨 보석 여러 개</strong>가 더 효율적입니다!
                                </p>
                                <p className="text-slate-400 text-xs">
                                    예시: 보공 보석 5레벨 1개 (15%) → 보공 보석 3레벨 3개 (18%)
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 6: 관리 및 주간 루틴 */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="text-3xl">📅</span>
                            6. 관리 및 주간 루틴
                        </h2>

                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-blue-400 mb-4">⚙️ 편리한 관리 기능</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">🔗 링크 매니지먼트</h4>
                                        <p className="text-slate-300">
                                            한 번 설정으로 모든 캐릭터의 링크스킬을 자동 관리!
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-white font-bold mb-2">⚔️ 유니온 자동 배치</h4>
                                        <p className="text-slate-300">
                                            원하는 스탯에 맞게 자동 배치 기능 활용
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-purple-400 mb-4">📝 주간 할 일</h3>

                                <div className="space-y-3 text-sm">
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                                            <span>🏆</span>
                                            유니온 주간 퀘스트
                                        </h4>
                                        <p className="text-slate-300">
                                            와이번 잡기로 <strong className="text-white">코인 수급</strong> (매주 필수!)
                                        </p>
                                    </div>

                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
                                            <span>💠</span>
                                            아티팩트 미션
                                        </h4>
                                        <ul className="text-slate-300 space-y-1">
                                            <li>• 주 4회 접속</li>
                                            <li>• 보스 처치</li>
                                            <li>• 기타 미션 달성</li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                                        <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                            <span>⚠️</span>
                                            아티팩트 기간 연장
                                        </h4>
                                        <p className="text-slate-300">
                                            <strong className="text-yellow-400">한 달에 한 번</strong> 아티팩트 포인트로 기간 연장 필수!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion */}
                    <section className="mb-12">
                        <div className="bg-gradient-to-r from-maple-orange/10 to-yellow-500/10 border border-maple-orange/30 rounded-xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">마치며</h2>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                유니온, 링크스킬, 아티팩트. 이 세 가지만 제대로 갖춰도 메이플스토리에서
                                <strong className="text-maple-orange"> 무과금으로도 충분히 강한 캐릭터</strong>를 만들 수 있습니다.
                            </p>
                            <p className="text-slate-300 leading-relaxed mb-4">
                                처음에는 30캐릭 키우는 것이 막막하게 느껴질 수 있지만,
                                이 가이드대로 한 캐릭터씩 차근차근 키우다 보면 어느새 <strong className="text-yellow-400">유니온 6000</strong>을
                                달성한 자신을 발견하게 될 것입니다.
                            </p>
                            <p className="text-slate-400 text-sm">
                                더 자세한 정보가 필요하다면 <Link href="/guide" className="text-blue-400 hover:text-blue-300 underline">메이플 AI 가이드</Link>를
                                참고하시거나, <Link href="/" className="text-blue-400 hover:text-blue-300 underline">캐릭터 진단</Link>을 받아보세요!
                            </p>
                        </div>
                    </section>
                </div>

                {/* Share & Navigation */}
                <div className="border-t border-slate-800 pt-8 mt-12">
                    <div className="flex justify-between items-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>블로그 목록으로</span>
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>공유하기</span>
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}
