'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Flame, Gift, Zap, Target, Sparkles, AlertCircle, ShoppingCart, Crown } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function Testworld23rdAnniversaryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base md:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-sm sm:text-base text-slate-400">2026년 3월 15일</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                        <span className="text-4xl mr-2">🍁</span>
                        <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                            메이플 23주년 이벤트 상세 총정리 & 보상 가이드
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-4 sm:mb-6 leading-relaxed break-keep">
                        역대급 혜택과 새로운 시스템으로 꽉꽉 채워진 메이플스토리 23주년 업데이트! 3월 19일 본섭 적용 전에 모든 이벤트 내용(기프트 티켓 상점 등)과 최단기 획득 스케줄을 가독성 있게 표로 완벽하게 정리했습니다.
                    </p>

                    {/* Update Schedule Table */}
                    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700">
                        <table className="w-full text-sm sm:text-base text-left">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th className="px-4 py-3 w-1/3">구분</th>
                                    <th className="px-4 py-3">일정</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-700/50">
                                    <th className="px-4 py-3 font-medium text-slate-400">테스트월드</th>
                                    <td className="px-4 py-3">2026년 3월 12일 (목)</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-3 font-medium text-orange-400">본서버 적용 예정</th>
                                    <td className="px-4 py-3 font-bold text-orange-400">2026년 3월 19일 (목) 점검 후 ~</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 1. 하이퍼 버닝 부스터 */}
                <section className="mb-10 lg:mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">1. 하이퍼 버닝 부스터 (1+4 레벨업)</h2>
                    </div>

                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-orange-900/20 max-w-2xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/hyper-burning.png"
                            alt="메이플스토리 23주년 하이퍼 버닝 부스터"
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>

                    <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-5 mb-6">
                        <ul className="space-y-2 text-sm sm:text-base text-slate-200">
                            <li>🎯 <span className="font-bold text-yellow-300">핵심:</span> 10~258레벨(제로 100~258레벨) 캐릭터 1개에 <span className="font-bold text-white">1+4 레벨업 효과</span> (260레벨까지)</li>
                            <li>📅 <span className="font-bold text-slate-300">기간:</span> 3월 19일(목) ~ 6월 17일(수) (효과 유지는 6/18 오전 2시까지)</li>
                            <li>⚠️ <span className="font-bold text-red-400">주의사항:</span> 기존 테라/메가 버닝 지정 시 기존 효과 소멸. 지정 이후 달성한 레벨의 보상만 획득 가능. 제로는 스토리 퀘스트 챕터 2 완료 필수.</li>
                        </ul>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-yellow-300 mb-3 ml-2 flex items-center gap-2">
                        🎁 레벨 달성 보상표 <span className="text-[10px] sm:text-xs font-normal text-slate-400">(모두 교환 불가, 메이플ID당 1회)</span>
                    </h3>
                    <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/40">
                        <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap sm:whitespace-normal">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th className="px-3 py-3 w-1/4 sm:w-[120px]">달성 레벨</th>
                                    <th className="px-3 py-3">지급 보상 상세</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                <tr>
                                    <th className="px-3 py-4 font-bold text-orange-400 bg-orange-900/10">지정 즉시</th>
                                    <td className="px-3 py-4 bg-orange-900/10 whitespace-normal">
                                        <ul className="list-disc ml-4 space-y-1">
                                            <li>달팽이 펫 30일 (연장 불가)</li>
                                            <li>블랙 방어구 3종/무기 상자 (※제로는 무기/보조 제외)</li>
                                            <li>15성 루타비스 세트 방어구/무기 상자 (90일 기간제)</li>
                                            <li>Eternal Flame 칭호 & 이터널 플레임 링 (유니크)</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr><th className="px-3 py-3 text-slate-300">200레벨</th><td className="px-3 py-3 whitespace-normal">아케인심볼: 여로(7레벨), 코젬 20개, 성향비약</td></tr>
                                <tr><th className="px-3 py-3 text-slate-300">210레벨</th><td className="px-3 py-3 whitespace-normal">아케인심볼: 츄츄(7레벨), 코젬 20개</td></tr>
                                <tr>
                                    <th className="px-3 py-3 font-bold text-purple-400 bg-purple-900/10">220레벨</th>
                                    <td className="px-3 py-3 bg-purple-900/10 font-bold text-white whitespace-normal">앱솔 무기(17성 유니크) OR 도미(15성 유니크) 영구</td>
                                </tr>
                                <tr><th className="px-3 py-3 text-slate-300">230~255</th><td className="px-3 py-3 whitespace-normal">아케인심볼(7레벨), 하이퍼 버닝 의상, 선택 심볼 150개 등</td></tr>
                                <tr>
                                    <th className="px-3 py-4 font-bold text-cyan-400 bg-cyan-900/10">260레벨</th>
                                    <td className="px-3 py-4 bg-cyan-900/10 text-white font-bold whitespace-normal">선택 어센틱심볼 100개 + <span className="text-cyan-300">5레벨 어센틱(영구)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 2. 메이플 어택 */}
                <section className="mb-10 lg:mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">2. 23주년 메인 이벤트: [메이플 어택!]</h2>
                    </div>

                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-green-900/20 max-w-2xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/maple-attack.png"
                            alt="메이플 어택! with LOTTE"
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="bg-green-900/20 text-slate-300 p-3 rounded-lg border border-green-500/30 mb-6 text-sm">
                        <p>기간: 3월 19일(목) ~ 6월 17일(수) | 대상: 101레벨 이상 캐릭터 (제로는 챕터2 완료)</p>
                    </div>

                    <h3 className="text-lg font-bold text-green-300 mb-3 ml-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5"/> ① [출석] 마스코트 퍼레이드
                    </h3>
                    
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-green-900/10 max-w-2xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/mascot-parade.png"
                            alt="마스코트 퍼레이드 UI"
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-green-500/30 text-sm">
                        <p>👉 <span className="font-bold">방법:</span> 매일 1회 UI 버튼 클릭 (주 최대 5회, 총 60회 가능). 지각 패스 3,000 메포.</p>
                        <p>👉 <span className="font-bold">매일 즉시 획득:</span> 경험치 3배 쿠폰(30분) 3개, <span className="text-yellow-300 font-bold">기프트 티켓 800개</span>, 마스코트 파워 1개.</p>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-700 mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr><th className="px-4 py-3 w-1/4">누적 일차</th><th className="px-4 py-3">주요 보상 내역</th><th className="px-4 py-3 text-center">종류</th></tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                                <tr><th className="px-4 py-2 font-medium">1, 21, 41일차</th><td className="px-4 py-2 text-orange-300">쁘띠 버섯 세트 (1차: 주황, 21차: 초록, 41차: 파란)<br/><span className="text-xs text-slate-400">※ 자석펫 효과, 마법의 시간 연장 불가</span></td><td className="px-4 py-2 text-center text-slate-400">펫</td></tr>
                                <tr><th className="px-4 py-2 font-medium">5, 45, 55일차</th><td className="px-4 py-2">극성비, 도성비, 초성비</td><td className="px-4 py-2 text-center text-slate-400">성장</td></tr>
                                <tr><th className="px-4 py-2 font-medium">15, 25, 30, 35, 40</th><td className="px-4 py-2 font-bold text-purple-300">솔 에르다 / 조각 선택권 (총 5회)</td><td className="px-4 py-2 text-center text-slate-400">성장</td></tr>
                                <tr><th className="px-4 py-2 font-medium">20, 32, 52일차</th><td className="px-4 py-2">페어리 하트, 뽀송/홍조 스킨, 마네킹/슬롯</td><td className="px-4 py-2 text-center text-slate-400">코디/장비</td></tr>
                                <tr><th className="px-4 py-2 font-medium">27,37,47,57일차</th><td className="px-4 py-2 text-red-300">카르마 검은 환생의 불꽃 (총 300개)</td><td className="px-4 py-2 text-center text-slate-400">강화</td></tr>
                                <tr><th className="px-4 py-2 font-medium">13, 29, 39, 50</th><td className="px-4 py-2">카유잠, 카르마 에디 에픽, 17성 강화권, <span className="font-bold text-white">카블큐 20개</span></td><td className="px-4 py-2 text-center text-slate-400">강화</td></tr>
                                <tr className="bg-green-900/20"><th className="px-4 py-3 text-green-400 font-bold text-base">최종 60일차</th><td className="px-4 py-3 font-bold text-white">마스코트 퍼레이드 상자 <span className="text-yellow-300 text-sm">(카화에 20개 + 훈장)</span></td><td className="px-4 py-3 text-center text-green-400 font-bold">최종</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-xl mb-8 text-sm">
                        <p className="font-bold text-yellow-400 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5"/> 스페셜 미션 (영구 자석펫 & 펫장비 주문서)</p>

                        <div className="mb-4 rounded-lg overflow-hidden border border-yellow-500/20 shadow-lg max-w-sm sm:max-w-md mx-auto sm:mx-0">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/special-mission.png"
                                alt="스페셜 미션 보상 선택권"
                                width={600}
                                height={300}
                                className="w-full h-auto object-contain bg-slate-800"
                            />
                        </div>

                        <ul className="list-disc ml-4 text-slate-300 space-y-1">
                            <li><span className="font-bold text-white">조건:</span> 마스코트 파워 60개 수집 + 레범몬 10만 마리 누적 처치</li>
                            <li><span className="font-bold text-white">최종 보상:</span> <span className="text-yellow-300 font-bold">쁘띠 마스코트 버섯 펫 선택권 (생명 연장 가능, 영구 펫장비) + 프리미엄 펫장비 공/마 선택권 8장</span></li>
                        </ul>
                    </div>

                    <h3 className="text-lg font-bold text-cyan-300 mb-3 ml-2 flex items-center gap-2">
                        <Zap className="w-5 h-5"/> ② [이벤트 스킬] 메이플 스위츠
                    </h3>

                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-cyan-900/10 max-w-3xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/maple-sweets.png"
                            alt="메이플 스위츠 UI"
                            width={800}
                            height={500}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="rounded-xl border border-slate-700 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr><th className="px-4 py-3 text-orange-300">🥤 드링크 (능력치 강화)</th><th className="px-4 py-3 text-center">만렙(6렙) 보퍼</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                                    <tr><td className="px-4 py-2">공/마, 보공, 방무, 일반 뎀지</td><td className="px-4 py-2 font-bold text-white text-center">+40 / 40%</td></tr>
                                    <tr><td className="px-4 py-2">올스탯, HP/MP</td><td className="px-4 py-2 text-center">+80 / 4000</td></tr>
                                    <tr><td className="px-4 py-2">벞지, 크확</td><td className="px-4 py-2 text-center">+30%</td></tr>
                                    <tr><td className="px-4 py-2 font-bold text-orange-300">획득 경험치 추가</td><td className="px-4 py-2 font-bold text-yellow-300 text-center">+15%</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="rounded-xl border border-slate-700 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr><th className="px-4 py-3 text-purple-300">🍪 스낵 (보상 강화)</th><th className="px-4 py-3 text-center">만렙(6렙) 효과</th></tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-900/50">
                                    <tr className="bg-purple-900/10"><td className="px-4 py-2 font-bold text-white">보스 솔 에르다 획득량</td><td className="px-4 py-2 font-bold text-purple-400 text-center">+100% (2배)</td></tr>
                                    <tr><td className="px-4 py-2">일퀘 완료 경험치</td><td className="px-4 py-2 text-center">+50%</td></tr>
                                    <tr><td className="px-4 py-2">아케인/그란디스 일퀘 심볼</td><td className="px-4 py-2 text-center">+20개 / +9개</td></tr>
                                    <tr><td className="px-4 py-2">유니온 주간 코인</td><td className="px-4 py-2 text-center">+400개 추가</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-yellow-400 mb-3 ml-2 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5"/> ③ [이벤트 샵] 기프트 티켓 상점 & 메소샵
                    </h3>

                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-yellow-900/10 max-w-4xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/event-shop.png"
                            alt="기프트 티켓 상점 및 메소샵"
                            width={1000}
                            height={400}
                            className="w-full h-auto object-cover bg-slate-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-yellow-300 mb-2 border-b border-slate-700 pb-2">🎟️ 기프트 티켓 상점</h4>
                            <ul className="list-disc ml-4 space-y-1 text-slate-300">
                                <li>에픽잠재, 카유잠, 카르마 에디에픽 100%</li>
                                <li>이벤트 링 선택권, 전용 골드 큐브, 레전 100% 줌서</li>
                                <li>펫장비(공/마), 카르마 스페셜 하트 주문서</li>
                                <li>슈피겔라 황금 딸기 농장 입장권(15분), 서큘레이터</li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-yellow-500 mb-2 border-b border-slate-700 pb-2">💰 메소샵</h4>
                            <ul className="list-disc ml-4 space-y-1 text-slate-300">
                                <li><span className="font-bold text-yellow-300">카르마 놀긍혼 100%</span></li>
                                <li>플라즈마 하트 (마일리지 보유자 한정)</li>
                                <li>펫장비 능력치 이전 주문서, 뎀스 추출권</li>
                                <li>12~21주년 역대 코디/의자/라이딩/뎀스 박스</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 3. 체인지 버닝: 루시드 */}
                <section className="mb-10 lg:mb-14">
                    <div className="flex items-center gap-3 mb-6">
                        <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400">3. 체인지 버닝: 루시드 🦋</h2>
                    </div>

                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-purple-900/20 max-w-2xl mx-auto">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/change-burning-lucid.png"
                            alt="체인지 버닝 루시드"
                            width={800}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-5 mb-6 text-sm text-slate-200">
                        <p className="font-bold text-purple-300 mb-3 text-base">"루시드로 변신할 수 있는 꿈같은 시간을 즐겨 보세요!"</p>
                        <ul className="space-y-1.5">
                            <li>🎯 <span className="font-bold text-white">참여 대상:</span> 200레벨 이상 캐릭터 (제로는 챕터2 완료). <span className="text-yellow-300">명의 당 1개 캐릭터만 지정 가능</span> (버닝 캐릭터도 동일하게 적용 가능)</li>
                            <li>📅 <span className="font-bold text-white">이벤트 기간:</span> 3월 19일(목) 점검 후 ~ 6월 17일(수) 오후 11시 59분</li>
                            <li>💡 <span className="font-bold text-white">핵심:</span> 사냥터에서 <span className="text-purple-300 font-bold">직접 루시드로 변신</span>해 몬스터를 학살하고 폭발적인 경험치를 획득하며, 최대 100레벨까지 전용 스킬과 장비로 성장시키는 콘텐츠.</li>
                        </ul>
                    </div>
                    
                    <h3 className="text-lg font-bold text-pink-300 mb-3 ml-2 flex items-center gap-2">🦋 체인지 루시드 (변신 시스템)</h3>
                    
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-pink-900/10 max-w-4xl mx-auto bg-slate-800">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/change-lucid-system.png"
                            alt="체인지 루시드 변신 스킬 및 상태 UI"
                            width={1000}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-sm mb-6">
                        <ul className="list-disc ml-5 space-y-2 text-slate-300">
                            <li>초보자 스킬창의 <span className="font-bold text-purple-300">'체인지: 루시드'</span> 스킬을 사용하여 변신할 수 있습니다.</li>
                            <li><span className="font-bold text-white">마을:</span> 조건 없이 상시로 변신이 가능합니다.</li>
                            <li><span className="font-bold text-white">사냥터:</span> 레벨 범위 몬스터 사냥터에서 변신 가능. 사냥 시 전용 특수 몬스터인 <span className="text-yellow-300 font-bold">'드림 이터' (매주 25,000마리 제한)</span> 마릿수를 소모하며, 0이 될 경우 변신이 해제되고 더 이상 사냥터용 변신을 할 수 없습니다.</li>
                            <li>변신 해제 시 전용 UI(CHANGE STATUS)에서 남은 드림 이터 마릿수 및 악몽 침식 게이지를 확인할 수 있습니다.</li>
                        </ul>
                    </div>

                    <h3 className="text-lg font-bold text-indigo-300 mb-3 ml-2 flex items-center gap-2">✨ 전용 스킬 및 성장 시스템</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-indigo-300 mb-2">📈 루시드 성장 (최대 100Lv)</h4>
                            
                            <div className="mb-3 rounded-lg overflow-hidden border border-indigo-500/20 shadow-lg">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/lucid-growth.png"
                                    alt="루시드 성장 및 스탯 UI"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <p className="text-slate-300 mb-2">루시드 전용 필드 몬스터 처치 및 미션을 통해 경험치를 얻어 레벨업 할 수 있습니다.</p>
                            <p className="text-slate-300">판타즈멀 왈츠 등 다수의 스킬과, <span className="text-yellow-300">45레벨 달성 시 전용기인 '피니스 솜니아'</span>까지 강력한 전용 광역/이동 스킬들을 다채롭게 사용합니다.</p>
                        </div>
                        <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-pink-300 mb-2">⚔️ 별도 데미지 산출</h4>
                            
                            <div className="mb-3 rounded-lg overflow-hidden border border-pink-500/20 shadow-lg">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/lucid-skill.png"
                                    alt="체인지 루시드 스킬트리"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <p className="text-slate-300 mb-2">기존 본캐 스탯과 별개의 데미지 산출 방식을 따릅니다.</p>
                            <ul className="list-disc ml-4 text-slate-300 space-y-1">
                                <li><span className="font-bold text-white">전용 던전(몽환의 시련/악몽의 숲):</span> 루시드 전용 장비와 능력치 기반</li>
                                <li><span className="font-bold text-white">일반 필드 사냥터:</span> 변신 직전 본캐 전투력 수치 기반</li>
                            </ul>
                        </div>
                    </div>

                    <h3 className="text-lg font-bold text-yellow-300 mb-3 ml-2 flex items-center gap-2">🏆 루시드 콘텐츠 핵심 요약</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-pink-400 mb-2">⚔️ 악몽 제어 (필드 사냥)</h4>

                            <div className="mb-3 rounded-lg overflow-hidden border border-pink-500/20 shadow-lg">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/nightmare-control.png"
                                    alt="악몽 제어 필드 사냥 효과"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <p className="text-slate-300">매주 25,000마리의 몬스터를 루시드로 사냥. 1,250마리 처치 시마다 '악몽 침식'이 발동해 몹 떼가 소환되며 막대한 EXP를 지급.</p>
                        </div>
                        <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl text-sm">
                            <h4 className="font-bold text-indigo-400 mb-2">🌲 악몽의 숲 (몽환의 장비)</h4>
                            
                            <div className="mb-3 rounded-lg overflow-hidden border border-indigo-500/20 shadow-lg">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/nightmare-forest.jpg"
                                    alt="악몽의 숲 던전 입장"
                                    width={500}
                                    height={300}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <p className="text-slate-300">하루 5개 지급되는 '드림캐쳐'로 입장. 숲의 근원을 격파해 루시드 전용 장비 전령(무기), 근원(반지), 경계(펜던트) 획득/강화.</p>
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-yellow-300 mb-3 ml-2 flex items-center gap-2">🎁 드림 기프트 (레벨 달성 보상)</h3>
                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-sm mb-4">
                        <ul className="list-disc ml-5 space-y-1 text-slate-300 mb-2">
                            <li><span className="font-bold text-white">내 캐릭터 보상:</span> 성장에 도움되는 아이템, 치장/소장용 아이템 지급 <span className="text-slate-400 text-xs">(월드 내 이동 가능 / 명의당 1회)</span></li>
                            <li><span className="font-bold text-white">루시드 보상:</span> 루시드 전용 장비 및 성장 재료 지원 <span className="text-slate-400 text-xs">(교환 불가)</span></li>
                        </ul>
                    </div>

                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-yellow-900/10 max-w-4xl mx-auto bg-slate-800">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/dream-gift.png"
                            alt="드림 기프트 보상 수령 UI"
                            width={1000}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-700 mb-6 bg-slate-900/50 override-scrollbar">
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="w-full text-xs sm:text-sm text-left min-w-[450px]">
                                <thead className="bg-slate-800 text-slate-200 sticky top-0 z-10 shadow-md">
                                    <tr>
                                        <th className="px-2 sm:px-4 py-3 w-[50px] text-center border-b border-slate-700">Lv</th>
                                        <th className="px-3 sm:px-4 py-3 text-pink-300 border-b border-slate-700">내 캐릭터 보상 (주요)</th>
                                        <th className="px-3 sm:px-4 py-3 text-indigo-300 border-b border-slate-700">루시드 보상</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 text-slate-300">
                                    <tr><td className="px-4 py-3 text-center text-slate-400">10~15</td><td className="px-4 py-3">드림 샤드 200개</td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 3개</td></tr>
                                    <tr className="bg-slate-800/30"><td className="px-4 py-3 text-center font-bold text-white">20</td><td className="px-4 py-3 font-bold text-pink-200">루시드 데미지 스킨 (유닛)<br/><span className="font-normal text-slate-400">드림 샤드 200개</span></td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 3개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">25</td><td className="px-4 py-3">드림 샤드 300개</td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 3개</td></tr>
                                    <tr className="bg-slate-800/30"><td className="px-4 py-3 text-center font-bold text-white">30</td><td className="px-4 py-3 font-bold text-pink-200">메르세데스 베개 교환권<br/><span className="font-normal text-slate-400">드림 샤드 300개</span></td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 3개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">35</td><td className="px-4 py-3">드림 샤드 300개</td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 3개</td></tr>
                                    <tr className="bg-slate-800/30"><td className="px-4 py-3 text-center font-bold text-white">40</td><td className="px-4 py-3 font-bold text-pink-200">루시드와 함께한 추억 (의자)<br/><span className="font-normal text-slate-400">드림 샤드 500개</span></td><td className="px-4 py-3 font-bold text-indigo-300">의문의 몽환의 결정 상자 (에픽)</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">45~50</td><td className="px-4 py-3">드림 샤드 500개</td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 5개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">55</td><td className="px-4 py-3">드림 샤드 1,000개</td><td className="px-4 py-3 font-bold text-indigo-300">의문의 몽환의 결정 상자 (에픽) 2개</td></tr>
                                    <tr className="bg-slate-800/30"><td className="px-4 py-3 text-center font-bold text-white">60</td><td className="px-4 py-3 font-bold text-pink-200">강력한 소환수 라이딩 (영구)<br/><span className="font-normal text-slate-400">드림 샤드 1,000개</span></td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 5개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">65</td><td className="px-4 py-3">드림 샤드 1,000개</td><td className="px-4 py-3 font-bold text-indigo-300">의문의 몽환의 결정 상자 (유니크) 1개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">70</td><td className="px-4 py-3">드림 샤드 1,000개</td><td className="px-4 py-3 text-slate-400">악몽의 드림캐쳐 교환권 10개</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">75</td><td className="px-4 py-3">드림 샤드 1,500개</td><td className="px-4 py-3 font-bold text-indigo-300">의문의 몽환의 결정 상자 (유니크) 2개</td></tr>
                                    <tr className="bg-slate-800/30"><td className="px-4 py-3 text-center font-bold text-white">80</td><td className="px-4 py-3 font-bold text-pink-200">체인지 루시드 명찰/말풍선 반지<br/><span className="font-normal text-slate-400">드림 샤드 1,500개</span></td><td className="px-4 py-3 font-bold text-yellow-300">몽환의 결정 선택 상자 (유니크)</td></tr>
                                    <tr><td className="px-4 py-3 text-center text-slate-400">85</td><td className="px-4 py-3">드림 샤드 2,000개</td><td className="px-4 py-3 font-bold text-yellow-300">몽환의 장비 선택 상자 (유니크)</td></tr>
                                    <tr><td className="px-4 py-3 text-center font-bold text-white">90</td><td className="px-4 py-3 font-bold text-slate-200">드림 샤드 3,000개</td><td className="px-4 py-3 font-bold text-yellow-500">의문의 몽환의 결정 상자 (레전드리)</td></tr>
                                    <tr><td className="px-4 py-3 text-center font-bold text-white">95</td><td className="px-4 py-3 font-bold text-slate-200">드림 샤드 3,000개</td><td className="px-4 py-3 font-bold text-yellow-500">몽환의 장비 선택 상자 (레전드리)</td></tr>
                                    <tr className="bg-indigo-900/30"><td className="px-4 py-3 text-center font-black text-yellow-300">100</td><td className="px-4 py-3 font-black text-yellow-300">전설 성장의 비약 (200~279)<br/>꿈과 환상의 도시 메이플 홈 테마</td><td className="px-4 py-3 font-black text-yellow-500">몽환의 결정 선택 상자 (레전드리)</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm mb-6">
                        <h4 className="font-bold text-yellow-300 mb-2">🛍️ 드림 샤드샵</h4>

                        <div className="mb-4 rounded-lg overflow-hidden border border-slate-600 shadow-lg max-w-full sm:max-w-sm mx-auto sm:mx-0">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/dream-shard-shop.png"
                                alt="드림 샤드샵 판매 목록"
                                width={600}
                                height={400}
                                className="w-full h-auto object-contain bg-slate-900"
                            />
                        </div>

                        <ul className="list-disc ml-5 text-slate-300 space-y-1 text-xs sm:text-sm">
                            <li>성장하며 획득한 <span className="text-pink-300">'드림 샤드'</span> 코인을 사용하여 상점을 이용할 수 있습니다.</li>
                            <li><span className="font-bold text-white">해방 유저 한정 특별 판매:</span> <span className="text-yellow-300 font-bold">블랙/화이트 큐브</span> 등 최상위 템!</li>
                            <li><span className="font-bold text-white">일반 판매:</span> 솔 에르다 조각 등 필수 성장 재화</li>
                        </ul>
                    </div>

                    <h3 className="text-lg font-bold text-pink-300 mb-3 ml-2 flex items-center gap-2">⚔️ 몽환의 시련 (보스 챌린지)</h3>
                    
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-pink-900/10 max-w-4xl mx-auto bg-slate-800">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/dream-trial.jpg"
                            alt="몽환의 시련 미션 UI"
                            width={1000}
                            height={400}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl text-sm mb-4">
                        <ul className="list-disc ml-5 space-y-1 text-slate-300 mb-4">
                            <li><span className="font-bold text-white">참여 조건:</span> 체인지버닝 루시드 캐릭터로 특정 보스를 처치 시 미션 완료 (주간 보스 제한 미차감)</li>
                            <li><span className="font-bold text-yellow-300">핵심:</span> 1인 파티/파티 안 맺은 상태로 UI를 통해 즉시 이동. 무한 자유 재도전 가능. 월드 리프 시에도 진행도 유지.</li>
                        </ul>
                    </div>
                
                    <div className="overflow-x-auto rounded-xl border border-slate-700 mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-800 text-slate-200">
                                <tr>
                                    <th className="px-4 py-3 min-w-[120px]">보스 (난이도)</th>
                                    <th className="px-4 py-3 text-pink-300">🎁 내 캐릭터 보상 <span className="text-xs text-slate-400 font-normal">(월드내 교환가)</span></th>
                                    <th className="px-4 py-3 text-indigo-300">💎 루시드 보상 <span className="text-xs text-slate-400 font-normal">(교환불가)</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50 bg-slate-900/50 text-slate-300">
                                <tr>
                                    <td className="px-4 py-3 font-bold text-white">자쿰 <span className="text-slate-400 text-xs">(카오스)</span></td>
                                    <td className="px-4 py-3 font-medium text-pink-200">체인지 루시드 로이드 교환권</td>
                                    <td className="px-4 py-3">의문의 몽환의 결정 상자(에픽)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-bold text-white">벨룸 <span className="text-slate-400 text-xs">(카오스)</span></td>
                                    <td className="px-4 py-3 font-medium text-pink-200">드림 라이트 뱅글 교환권</td>
                                    <td className="px-4 py-3">의문의 몽환의 결정 상자(유니크)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-bold text-purple-300">루시드 <span className="text-slate-400 text-xs">(하드)</span></td>
                                    <td className="px-4 py-3 font-medium text-purple-300">악몽의 주인 훈장 교환권</td>
                                    <td className="px-4 py-3 text-indigo-300 font-bold">몽환의 장비 선택 상자(유니크)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-bold text-red-300">헬레나 <span className="text-slate-400 text-xs">(노멀)</span><br/><span className="text-xs text-slate-500">*4월 업데이트</span></td>
                                    <td className="px-4 py-3"><span className="font-bold text-red-300">솜터진 헬레나 인형 교환권</span><br/>LUCID 칭호 교환권</td>
                                    <td className="px-4 py-3 font-bold text-yellow-300">몽환의 결정 선택 상자(유니크)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 font-black text-red-500 bg-red-900/10">헬레나 <span className="text-red-400 text-xs">(나이트메어)</span></td>
                                    <td className="px-4 py-3 font-bold text-red-400 bg-red-900/10">몽환의 나비 피니시 어택 이펙트 교환권</td>
                                    <td className="px-4 py-3 font-black text-yellow-400 bg-red-900/10">몽환의 결정 선택 상자(레전드리)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 4&5 기타 이벤트 디테일하게 추가 */}
                <section className="mb-14">
                    <div className="flex flex-col gap-10">
                        {/* 4. 진의 신비한 정원 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-400" />
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-400">4. 진의 신비한 정원 🎲</h2>
                            </div>
                            
                            <div className="bg-slate-800/50 p-4 rounded-xl mb-4 border border-indigo-500/30 text-sm">
                                <p className="font-bold text-white mb-2">👉 매일 주사위 3개를 굴려 40칸 보드를 돌며 '성장 비료'를 파밍하는 이벤트.</p>
                                <ul className="list-disc ml-4 space-y-1 text-slate-300">
                                    <li><span className="font-bold text-indigo-300">기간:</span> <span className="text-white">3월 23일(월) 오전 10시 ~ 5월 13일(수)</span> (⚠️ 타 이벤트와 기간이 다름 주의)</li>
                                    <li><span className="font-bold text-indigo-300">참여:</span> 주 5회 수령 (총 40회 제한). 지각 패스 가능(3,000 메포).</li>
                                </ul>
                            </div>

                            <div className="mb-6 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shadow-indigo-900/20 max-w-3xl mx-auto bg-slate-800">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/jin-garden.jpg"
                                    alt="진의 신비한 정원 주사위 보드판 UI"
                                    width={1000}
                                    height={600}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <div className="bg-slate-800/80 border border-indigo-500/30 p-4 rounded-xl text-sm mb-4">
                                <h4 className="font-bold text-indigo-300 mb-2 border-b border-slate-700 pb-2">🎯 보드판 특별 기믹</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 list-disc ml-5 text-slate-300">
                                    <li><span className="text-white font-bold">START 통과:</span> 성장 비료 +400개 지급</li>
                                    <li><span className="text-white font-bold">특수 주사위:</span> x2, x3, 혹은 마이너스(-5, -10) 등 효과</li>
                                    <li><span className="text-white font-bold">이동 발판:</span> 로켓(+10칸), 점프대(+3칸), 두더지(뒤로 2~3칸)</li>
                                    <li><span className="text-white font-bold">보스 몹 효과:</span> 황금벌(보상 2배), 독 호문(1/2배), 신비한벌(3배)</li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-2 ml-5">* 보스 몹 효과는 10턴 내 안밟으면 소멸합니다.</p>
                            </div>

                            <div className="bg-slate-800/80 border border-yellow-500/30 p-4 rounded-xl text-sm mb-6">
                                <h4 className="font-bold text-yellow-300 mb-2 border-b border-slate-700 pb-2">🛒 성장 비료 상점</h4>
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <div className="shrink-0 rounded-lg overflow-hidden border border-slate-600 shadow-lg w-full sm:max-w-[280px] bg-slate-900">
                                        <Image
                                            src="/images/blog/testworld-23rd-anniversary/growth-fertilizer-shop.png"
                                            alt="성장 비료 상점 판매 목록"
                                            width={500}
                                            height={400}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-300 mb-2 font-medium text-xs sm:text-sm">👉 보드판에서 모은 '비료'로 보상 교환!</p>
                                        <ul className="list-disc ml-5 space-y-1 text-slate-300 text-xs sm:text-sm">
                                            <li><span className="text-white font-bold">진 하이퍼 성장의 비약 (260~284)</span></li>
                                            <li>진 익스트림 성장의 비약 (200~259)</li>
                                            <li>상급 EXP 교환권 100개</li>
                                            <li>경험치 4배/3배 쿠폰, VIP 부스터</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-indigo-300 mb-3 ml-2">🎁 주사위 누적 굴림 횟수 보상</h3>
                            
                            <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-xl shadow-indigo-900/10 max-w-md mx-auto sm:mx-0">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/jin-garden-accumulated-reward.png"
                                    alt="진의 신비한 정원 누적 보상 UI"
                                    width={500}
                                    height={350}
                                    className="w-full h-auto object-contain bg-slate-900"
                                />
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/40">
                                <table className="w-full text-xs sm:text-sm text-left min-w-[320px]">
                                    <thead className="bg-slate-800 text-slate-200">
                                        <tr><th className="px-3 py-3 w-[80px] sm:w-1/4">누적 횟수</th><th className="px-3 py-3">지급 보상 상세</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr><th className="px-3 py-3 text-slate-300">15회</th><td className="px-3 py-3 text-slate-300">진과 함께 피워낸 꽃 (코디), 상급 EXP 500개</td></tr>
                                        <tr><th className="px-3 py-3 font-medium text-white">30회</th><td className="px-3 py-3 font-medium text-white">독 호문스큘러 라이딩, 진 익성비 1개</td></tr>
                                        <tr><th className="px-3 py-3 text-slate-300">45회</th><td className="px-3 py-3 text-slate-300">신비한 정원 칭호, 상급 EXP 500개</td></tr>
                                        <tr><th className="px-3 py-3 text-slate-300">60회</th><td className="px-3 py-3 text-slate-300">진과 함께한 추억 교환권, 진 익성비 1개</td></tr>
                                        <tr><th className="px-3 py-3 font-medium text-white">75회</th><td className="px-3 py-3 font-medium text-white"><span className="text-indigo-300 font-bold">정원사 진로이드 (안드로이드)</span></td></tr>
                                        <tr className="bg-yellow-900/10">
                                            <th className="px-3 py-4 text-yellow-400 font-bold text-sm sm:text-lg">90회 완주</th>
                                            <td className="px-3 py-4 font-bold text-white text-xs sm:text-base">신비한 정원 의상 세트 + <span className="text-yellow-300">진 익성비</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 5. 보스 & 프리미엄 PC방 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4 mt-6">
                                <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400">5. 보스 & 프리미엄 PC방 보상 💻</h2>
                            </div>

                            <div className="bg-orange-900/10 border border-orange-500/30 p-5 rounded-xl mb-6">
                                <h4 className="font-bold text-orange-400 text-lg mb-3 flex items-center gap-2"><Crown className="w-5 h-5"/> 신을 삼킨 자 선착순 격파 보상</h4>
                                <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-300">
                                    <li><span className="font-bold text-white">조건:</span> 전 월드에서 <span className="text-red-300 font-bold">유피테르(하드)</span>를 가장 먼저 격파한 최초 3팀 소속 유저 전원</li>
                                    <li><span className="font-bold text-white">보상 (모두 소장형 아이템):</span> 탐식의 마침표 교환권(7일), 균형의 명찰/말풍선 반지, 신의 용광로 커스텀 배경, 뒤엉킨 균형의 등장 이펙트</li>
                                </ul>
                            </div>

                            <h3 className="text-lg font-bold text-red-300 mb-3 ml-2 flex items-center gap-2">💻 프리미엄 PC방 접속 보상 <span className="text-xs font-normal text-slate-400">(기간: 3/20 ~ 4/16)</span></h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm">
                                    <h4 className="font-bold text-white mb-2 pb-1 border-b border-slate-700">일일 보상 (평일)</h4>
                                    <ul className="space-y-1 text-slate-300">
                                        <li><span className="font-medium">10 / 30분:</span> 마일리지 100</li>
                                        <li><span className="font-medium">60분:</span> 마일리지 500</li>
                                        <li><span className="font-medium text-orange-300">90분:</span> 마일리지 500 + <span className="font-bold text-orange-400">VIP 사우나 이용권</span></li>
                                    </ul>
                                </div>
                                <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm">
                                    <h4 className="font-bold text-red-300 mb-2 pb-1 border-b border-slate-700">일일 보상 (주말)</h4>
                                    <ul className="space-y-1 text-slate-300">
                                        <li><span className="font-medium">10 / 30 / 60분:</span> 동일 마일리지 + 매 구간 <span className="font-bold text-red-400">VIP 부스터 2개씩</span> 추가 지급</li>
                                        <li><span className="font-medium text-orange-300">90분:</span> 마일리지 500 + VIP 사우나 주말에도 동일 지급 + 부스터 추가</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-slate-700 bg-slate-900/40">
                                <table className="w-full text-xs sm:text-sm text-left min-w-[320px]">
                                    <thead className="bg-slate-800 text-slate-200">
                                        <tr><th className="px-3 py-3 w-[80px] sm:w-1/4">총 누적 시간</th><th className="px-3 py-3">최종 달성 보상</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr><th className="px-3 py-4 font-medium">15시간</th><td className="px-3 py-4 font-bold text-purple-300">솔 에르다/조각 선택권 3개</td></tr>
                                        <tr><th className="px-3 py-4 font-medium">30시간</th><td className="px-3 py-4">상급 EXP 2000개 + 코디 세트</td></tr>
                                        <tr><th className="px-3 py-4 font-bold text-red-400">45시간</th><td className="px-3 py-4 font-bold text-red-400">카르마 블랙 큐브 30개</td></tr>
                                        <tr className="bg-red-900/10"><th className="px-3 py-4 font-bold text-red-400 text-sm sm:text-lg">60시간 완주</th><td className="px-3 py-4 font-bold text-red-400 text-xs sm:text-base">카르마 화이트 에디셔널 큐브 30개</td></tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* 일정표 종결 */}
                <section className="mb-12">
                    <div className="bg-slate-800/80 border-2 border-yellow-500/50 rounded-2xl p-6 shadow-2xl shadow-yellow-900/20">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Target className="w-8 h-8 text-yellow-400 animate-pulse" />
                            <h2 className="text-2xl sm:text-3xl font-black text-white text-center">🏆 한눈에 보는 최단기 스케줄 표</h2>
                        </div>
                        <p className="text-center text-slate-300 mb-6 text-sm">
                            이벤트 시작일부터 <span className="font-bold text-yellow-300">단 하루도 빠짐없이, 현질 없이 주간 제한까지 꽉 채웠을 때</span>의 날짜 캘린더입니다.
                        </p>

                        <div className="flex flex-col gap-8">
                            {/* 1. 마스코트 퍼레이드 최단기 루트 */}
                            <div>
                                <h3 className="text-lg font-bold text-green-300 mb-3 ml-2 flex items-center gap-2">
                                    🍄 1. [출석 이벤트] 마스코트 퍼레이드 루트
                                </h3>
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-green-500/20 mb-3 text-xs sm:text-sm text-slate-300">
                                    <p>📅 <span className="text-white font-bold">이벤트 시작:</span> 3월 19일(목) | <span className="text-white font-bold">참여:</span> 주 5일 (목~월 출석 기준)</p>
                                </div>
                                <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80 override-scrollbar">
                                    <table className="w-full text-[10px] sm:text-xs md:text-sm text-left min-w-[320px]">
                                        <thead className="bg-slate-800 text-slate-200 border-b border-slate-600">
                                            <tr>
                                                <th className="px-2 py-3 w-[65px] sm:w-[100px] whitespace-nowrap">달성 일차</th>
                                                <th className="px-2 py-3 w-[85px] sm:w-[120px] whitespace-nowrap border-l border-slate-700">예상 획득일</th>
                                                <th className="px-3 py-3 border-l border-slate-600 font-bold text-yellow-300">핵심 보상</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700">
                                            <tr className="bg-green-900/10"><th className="px-2 py-2 text-white font-bold whitespace-nowrap">1일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">3월 19일 (목)</td><td className="px-3 py-2 border-l border-slate-700 font-bold text-white break-keep sm:break-normal">쁘띠 주황버섯 세트 (자석펫)</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">5일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">3월 23일 (월)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">극한 성장의 비약 (200~249)</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">10일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">3월 30일 (월)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">이벤트 링 선택권</td></tr>
                                            <tr><th className="px-2 py-2 text-purple-300 whitespace-nowrap">15일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">4월 6일 (월)</td><td className="px-3 py-2 border-l border-slate-700 text-purple-300 font-bold break-keep sm:break-normal">솔 에르다/조각 선택권</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">20일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">4월 13일 (월)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">페어리 하트 교환권</td></tr>
                                            <tr className="bg-green-900/10"><th className="px-2 py-2 whitespace-nowrap">21일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">4월 16일 (목)</td><td className="px-3 py-2 border-l border-slate-700 font-bold text-white break-keep sm:break-normal">쁘띠 초록버섯 세트</td></tr>
                                            <tr><th className="px-2 py-2 text-purple-300 whitespace-nowrap">30일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">4월 27일 (월)</td><td className="px-3 py-2 border-l border-slate-700 text-purple-300 font-bold break-keep sm:break-normal">솔 에르다/조각 선택권</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">32일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">4월 30일 (목)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">뽀송/홍조 꽃잎 스킨 권</td></tr>
                                            <tr><th className="px-2 py-2 text-purple-300 whitespace-nowrap">40일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">5월 11일 (월)</td><td className="px-3 py-2 border-l border-slate-700 text-purple-300 font-bold break-keep sm:break-normal">솔 에르다/조각 선택권</td></tr>
                                            <tr className="bg-green-900/10"><th className="px-2 py-2 whitespace-nowrap">41일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">5월 14일 (목)</td><td className="px-3 py-2 border-l border-slate-700 font-bold text-white break-keep sm:break-normal">쁘띠 파란버섯 세트</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">45일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">5월 18일 (월)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">도약 성장의 비약 (200~259)</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">50일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">5월 25일 (월)</td><td className="px-3 py-2 border-l border-slate-700 text-red-300 break-keep sm:break-normal">카르마 블랙 큐브 20개</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">52일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">5월 28일 (목)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">마네킹 / 슬롯 확장 선택권</td></tr>
                                            <tr><th className="px-2 py-2 whitespace-nowrap">55일차</th><td className="px-2 py-2 whitespace-nowrap border-l border-slate-700">6월 1일 (월)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">초월 성장의 비약 (200~269)</td></tr>
                                            <tr className="bg-yellow-900/20 font-bold"><th className="px-2 py-3 text-yellow-300 whitespace-nowrap">60일차(완)</th><td className="px-2 py-3 whitespace-nowrap border-l border-slate-700">6월 8일 (월)</td><td className="px-3 py-3 border-l border-slate-700 text-yellow-300 break-keep sm:break-normal">카르마 화이트 에디셔널 큐브 20개 (최종)</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-3 p-3 bg-indigo-900/30 border border-indigo-500/30 rounded-lg text-xs text-slate-300">
                                    <p className="font-bold text-indigo-300 leading-relaxed mb-1">💡 스페셜 기프트 (마스코트 펫 선택권 + 프펫공/마 8개)</p>
                                    <p>6월 8일(월)에 60일차를 찍고 몬스터 10만 마리 처치도 끝냈더라도, 실제 수령은 <span className="text-white font-bold underline">6월 18일(목) 점검 이후</span>부터 가능합니다.</p>
                                </div>
                            </div>

                            {/* 2. 진의 신비한 정원 최단기 루트 */}
                            <div>
                                <h3 className="text-lg font-bold text-indigo-300 mb-3 ml-2 flex items-center gap-2">
                                    🎲 2. 진의 신비한 정원 (주사위) 루트
                                </h3>
                                <div className="bg-slate-800/50 p-3 rounded-lg border border-indigo-500/20 mb-3 text-xs sm:text-sm text-slate-300">
                                    <p>📅 <span className="text-white font-bold">이벤트 시작:</span> 3월 23일(월) | <span className="text-white font-bold">방법:</span> 첫 주 월~수(3일) 후 매주 목~월 참여</p>
                                </div>
                                <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80 override-scrollbar">
                                    <table className="w-full text-xs sm:text-sm text-left table-fixed sm:table-auto">
                                        <thead className="bg-slate-800 text-slate-200 border-b border-slate-600">
                                            <tr>
                                                <th className="px-3 py-3 w-[80px] sm:w-[100px] whitespace-nowrap">누적 굴림</th>
                                                <th className="px-3 py-3 w-[100px] sm:w-[120px] whitespace-nowrap border-l border-slate-700">예상 획득일</th>
                                                <th className="px-3 py-3 border-l border-slate-600 font-bold text-yellow-300">핵심 보상</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700">
                                            <tr><th className="px-3 py-2 whitespace-nowrap">15회 (5일차)</th><td className="px-3 py-2 whitespace-nowrap border-l border-slate-700">3월 27일 (금)</td><td className="px-3 py-2 border-l border-slate-700 text-slate-300 break-keep sm:break-normal">꽃 코디템, 상급 EXP 500개</td></tr>
                                            <tr><th className="px-3 py-2 whitespace-nowrap">30회 (10일차)</th><td className="px-3 py-2 whitespace-nowrap border-l border-slate-700">4월 3일 (금)</td><td className="px-3 py-2 border-l border-slate-700 font-bold text-white break-keep sm:break-normal">독 호문스큘러 라이딩, 진 익성비 1개</td></tr>
                                            <tr><th className="px-3 py-2 whitespace-nowrap">45회 (15일차)</th><td className="px-3 py-2 whitespace-nowrap border-l border-slate-700">4월 10일 (금)</td><td className="px-3 py-2 border-l border-slate-700 font-bold text-indigo-300 break-keep sm:break-normal">신비한 정원 칭호, 상급 EXP 500개</td></tr>
                                            <tr><th className="px-3 py-2 whitespace-nowrap">60회 (20일차)</th><td className="px-3 py-2 whitespace-nowrap border-l border-slate-700">4월 17일 (금)</td><td className="px-3 py-2 border-l border-slate-700 break-keep sm:break-normal">진과 함께한 추억 교환권, 진 익성비 1개</td></tr>
                                            <tr><th className="px-3 py-2 whitespace-nowrap">75회 (25일차)</th><td className="px-3 py-2 whitespace-nowrap border-l border-slate-700">4월 24일 (금)</td><td className="px-3 py-2 border-l border-slate-700 text-indigo-300 font-bold break-keep sm:break-normal">정원사 진로이드 (안드로이드)</td></tr>
                                            <tr className="bg-indigo-900/20 font-bold"><th className="px-3 py-3 text-yellow-300 whitespace-nowrap">90회 (30일차)</th><td className="px-3 py-3 whitespace-nowrap border-l border-slate-700">5월 1일 (금)</td><td className="px-3 py-3 border-l border-slate-700 text-yellow-300 text-base break-keep sm:break-normal">의상 세트, 진 익성비 (최종)</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-orange-600/30 to-red-600/30 border-2 border-orange-500/50 rounded-xl p-6 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">23주년 업데이트, 스펙업할 준비되셨나요?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-6">
                            메이플 AI에서 내 캐릭터를 진단하고 완벽한 육성 계획을 세워보세요!
                        </p>
                        <Link href="/">
                            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                무료 캐릭터 진단 시작하기
                            </button>
                        </Link>
                    </div>
                </section>
                
                {/* Keywords for SEO */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '메이플스토리', '메이플', '23주년', '업데이트', '이벤트', 
                        '하이퍼버닝', '체인지버닝', '루시드', '보상', '가이드', 
                        '스케줄', '기프트티켓', '진의신비한정원', '메이플어택', 
                        '공략', '스펙업', '캐릭터진단', '자석펫', '페어리하트', 
                        '솔에르다', '아케인심볼', '어센틱심볼', '코젬', '유잠', 
                        '화에큐', '마스코트퍼레이드', '드림기프트', '성장비료', 
                        '드림샤드', '메이플레벨업', '메이플이벤트일정', '메이플무자본', 
                        '메이플공략', '메이플육성법', '메이플사냥터', '메이플보스공약', 
                        '진익성비', '진익스트림성장의비약', '진하이퍼성장의비약'
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">
                            #{keyword}
                        </span>
                    ))}
                </div>
            </main>
        </div>
    );
}
