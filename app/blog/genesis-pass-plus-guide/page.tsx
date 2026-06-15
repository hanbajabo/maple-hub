'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, Star, AlertTriangle, CheckCircle, Info, Sword, BookOpen, Trophy, Shield, Zap, Gift, ShoppingBag, BarChart3, Coins, Sparkles, Heart } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function GenesisPassGuidePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
        <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>블로그 홈으로</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* 타이틀 */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> 2026년 6월 18일
            </span>
            <span className="px-3.5 py-1 text-xs font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-full">💎 제네시스 패스 업데이트</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
              제네시스 패스 & 제네시스 패스 PLUS 완벽 가이드
            </span>
          </h1>

          {/* 타이틀 이미지 */}
          <div className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-700/50 shadow-2xl shadow-purple-900/20">
            <img
              src="/genesis-pass-plus.png"
              alt="제네시스 패스 & 제네시스 패스 PLUS 완벽 가이드"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-purple-500 pl-5 py-2 bg-purple-950/10 rounded-r-lg">
            2026년 6월 18일 점검 후 출시되는 <span className="text-white font-bold">제네시스 패스</span>와 <span className="text-purple-300 font-bold">제네시스 패스 PLUS</span>! 
            어둠의 흔적 3배속 해방 혜택부터 6인 파티 해방 퀘스트, 보스 클리어 미션 리워드, 대적자 코인샵까지 유저들이 꼭 알아야 할 모든 정보를 정리해 드립니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#genesis-pass', '01', '제네시스 패스 기본 정보', 'text-purple-400'],
                ['#pass-effects', '02', '패스 3배속 및 파티 해방 효과', 'text-indigo-400'],
                ['#genesis-pass-plus', '03', '제네시스 패스 PLUS 및 보스 미션', 'text-pink-400'],
                ['#coin-shop', '04', '대적자 코인샵 및 활용 팁', 'text-yellow-400'],
                ['#why-easier', '05', '해방 난이도가 대폭 하락한 이유', 'text-green-400'],
              ].map(([href, num, label, color]) => (
                <li key={num} className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-purple-500/30 transition-colors">
                  <span className={`${color} font-mono font-bold`}>{num}</span>
                  <a href={href as string} className="text-slate-300 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 1. 제네시스 패스 기본 정보 */}
        <section id="genesis-pass" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Info className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 제네시스 패스 기본 정보</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-purple-300 mb-2 flex items-center gap-2"><Trophy className="w-4 h-4" /> 참여 대상</p>
                <p className="text-slate-300 text-sm">
                  ‘[제네시스 무기] 운명의 결전 그 후’ 퀘스트를 완료하고 ‘[제네시스 무기] 힘의 해방 두 번째’ 퀘스트를 완료하지 않은 <span className="text-white font-bold">255레벨 이상</span> 캐릭터
                </p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-indigo-300 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> 일정 정보</p>
                <ul className="text-slate-300 text-xs sm:text-sm space-y-1.5 list-disc list-inside">
                  <li><span className="font-semibold text-white">판매 기간</span>: 2026년 6월 18일(목) 점검 후 ~ 9월 15일(화) 오후 11:59</li>
                  <li><span className="font-semibold text-white">효과 적용</span>: 2026년 6월 18일(목) 점검 후 ~ 9월 16일(수) 오후 11:59</li>
                </ul>
              </div>
            </div>

            {/* 제네시스 패스 기본 정보 배너 */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img
                src="/genesis-pass-info.png"
                alt="제네시스 패스 기본 정보"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-2">🏷️ 판매 가격 및 유의사항</p>
              <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li><span className="font-semibold text-white">판매 가격</span>: 30,000 넥슨 캐시 (명의 당 1회 구매 가능)</li>
                <li className="text-amber-400">넥슨 캐시로만 구매할 수 있으며, <span className="font-bold text-amber-300">메이플포인트 및 마일리지는 사용 불가</span>합니다.</li>
                <li>캐시로 구매하더라도 청약철회 및 교환이 불가능합니다.</li>
                <li className="text-rose-400">제네시스 패스가 적용된 캐릭터를 삭제하더라도 다시 구매할 수 없으므로 캐릭터 삭제 시 각별한 주의가 필요합니다.</li>
                <li className="text-slate-400">※ 테스트 월드에서는 지원 상자에서 메이플ID 당 1개 획득하여 테스트해 볼 수 있습니다.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. 패스 3배속 및 파티 해방 효과 */}
        <section id="pass-effects" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 패스 3배속 및 파티 해방 효과</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            {/* 핵심 혜택 */}
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-5">
              <p className="font-extrabold text-purple-300 mb-2 text-base flex items-center gap-2">🔥 핵심 혜택 1: 어둠의 흔적 획득량 3배!</p>
              <p className="text-sm text-slate-300">
                보스 몬스터를 처치하고 획득하는 <span className="text-white font-bold">어둠의 흔적 획득량이 3배로 증가</span>합니다. 기존에 몇 달씩 걸리던 제네시스 해방 기간을 획기적으로 줄여주는 핵심 시스템입니다.
              </p>
              <p className="text-xs text-slate-400 mt-2">
                ※ 제네시스 패스 적용 주간에 이미 획득한 흔적이 있다면, 패스 활성화 시 어둠의 흔적 교환권(7일 기간제, 교환 불가)으로 소급 적용되어 지급됩니다.
              </p>
            </div>

            {/* 패스 3배속 및 파티 해방 효과 배너 */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img
                src="/genesis-pass-benefits.png"
                alt="어둠의 흔적 획득량 3배 및 6인 파티 해방 효과"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5">
              <p className="font-extrabold text-indigo-300 mb-2 text-base flex items-center gap-2">👥 핵심 혜택 2: 스우~진 힐라 6인 파티 해방 도전 가능</p>
              <p className="text-sm text-slate-300">
                제네시스 패스 이용자로 구성된 파티는 스우부터 진 힐라까지의 해방 퀘스트를 <span className="text-white font-bold">최대 6인까지 함께 클리어</span>할 수 있습니다. 기존의 1인 솔로잉 또는 2인 제한으로 진행하던 것보다 진입장벽이 대폭 완화됩니다.
              </p>
              <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-3 mt-3 text-xs text-red-300 space-y-1">
                <p className="font-bold">⚠️ 파티 인원수에 따른 최종 데미지 감소 디버프 (검은 마법사의 속박):</p>
                <p>• <span className="font-semibold text-white">2인 이상 파티로 도전 시</span>: 최종 데미지 <span className="font-bold text-red-300">50% 감소</span></p>
                <p>• <span className="font-semibold text-white">스우 해방 퀘스트의 경우</span>: 최종 데미지 <span className="font-bold text-red-300">60% 감소</span></p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <p className="font-bold text-slate-100 flex items-center gap-2">💪 핵심 혜택 3: "대적자의 힘" 능력치 버프</p>
              <p className="text-sm text-slate-300">
                제네시스 무기 해방을 완료하기 전까지, 어둠의 흔적을 지급하는 보스 도전 시 아래의 강력한 버프가 상시 적용됩니다.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  ['공격력 / 마력', '+20'],
                  ['올스탯', '+20'],
                  ['보스 데미지', '+10%'],
                  ['방어율 무시', '+10%'],
                  ['최대 HP/MP', '+1,000'],
                ].map(([stat, val]) => (
                  <div key={stat} className="bg-slate-900/80 rounded-lg p-2.5 text-center border border-slate-800">
                    <p className="text-[10px] text-slate-400 font-semibold">{stat}</p>
                    <p className="text-sm font-bold text-purple-300 mt-1">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 대적자의 힘 능력치 버프 및 소울 상자 혜택 배너 */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img
                src="/genesis-pass-buff.png"
                alt="대적자의 힘 능력치 버프 및 군단장 소울 지급 효과"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-yellow-400" /> 핵심 혜택 4: 위대한 군단장의 소울 상자</p>
              <p className="text-sm text-slate-300">
                제네시스 무기 해방 완료 시, <span className="text-white font-bold">공격력/마력 3% 옵션이 확정</span>으로 적용된 위대한 군단장의 소울을 1종 선택하여 획득할 수 있는 상자가 지급됩니다.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['매그너스', '스우', '데미안', '루시드', '윌', '진 힐라', '듄켈'].map(boss => (
                  <span key={boss} className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">위대한 {boss}의 소울</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. 제네시스 패스 PLUS 및 보스 미션 */}
        <section id="genesis-pass-plus" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Trophy className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 제네시스 패스 PLUS 및 보스 미션</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">
              <span className="text-pink-300 font-bold">제네시스 패스 PLUS</span>는 제네시스 패스를 구매한 유저 중 <span className="text-white font-bold">해방을 모두 완료한 캐릭터</span>가 참여할 수 있는 추가 성장형 보스 처치 미션 이벤트입니다.
            </p>

            {/* 제네시스 패스 PLUS 안내 배너 */}
            <div className="w-full rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg">
              <img
                src="/genesis-pass-plus-info.png"
                alt="제네시스 패스 PLUS 이벤트 기간"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-pink-300 mb-1">📅 이벤트 진행 기간</p>
                <p className="text-slate-300 text-sm">2026년 6월 18일(목) 점검 후 ~ 9월 16일(수) 오후 11:59</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-purple-300 mb-1">🎟️ PLUS 프리미엄 티켓</p>
                <p className="text-slate-300 text-sm">가격: 30,000 넥슨 캐시 (명의 당 1회 구매 가능)</p>
              </div>
            </div>

            {/* 보스 처치 미션 테이블 */}
            <div>
              <p className="font-bold text-slate-100 mb-3">🎯 보스 처치 미션 & 보상 목록</p>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-xs sm:text-sm text-left min-w-[600px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3.5 py-3.5 font-bold">미션 오픈 시점</th>
                      <th className="px-3.5 py-3.5 font-bold">격파 미션 조건</th>
                      <th className="px-3.5 py-3.5 font-bold text-cyan-300">기본 리워드</th>
                      <th className="px-3.5 py-3.5 font-bold text-purple-300">프리미엄 리워드</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">해방 완료 직후</td>
                      <td className="px-3.5 py-3">검은 마법사 하드 이상 처치</td>
                      <td className="px-3.5 py-3">대적자의 심연의 환생의 불꽃 20개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 2,500개</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">2026년 7월 23일(목)</td>
                      <td className="px-3.5 py-3">선택받은 세렌 노멀 이상 처치</td>
                      <td className="px-3.5 py-3">대적자의 블랙 큐브 10개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 1,500개</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">2026년 7월 30일(목)</td>
                      <td className="px-3.5 py-3">감시자 칼로스 이지 이상 처치</td>
                      <td className="px-3.5 py-3">대적자의 블랙 큐브 10개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 1,500개</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">2026년 8월 6일(목)</td>
                      <td className="px-3.5 py-3">최초의 대적자 이지 이상 처치</td>
                      <td className="px-3.5 py-3">대적자의 화이트 에디셔널 큐브 10개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 1,500개</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">2026년 8월 13일(목)</td>
                      <td className="px-3.5 py-3">카링 이지 이상 처치</td>
                      <td className="px-3.5 py-3">대적자의 화이트 에디셔널 큐브 10개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 1,500개</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3.5 py-3 font-semibold">2026년 8월 20일(목)</td>
                      <td className="px-3.5 py-3">벨로나 이지 이상 처치</td>
                      <td className="px-3.5 py-3">대적자 코인 500개</td>
                      <td className="px-3.5 py-3 text-purple-300 font-bold">대적자 코인 1,500개</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 text-xs text-slate-400 space-y-1">
              <p>※ 모든 보상은 2026년 9월 16일(수) 오후 11:59까지 수령 가능합니다.</p>
              <p>※ 보스 처치 미션은 지정된 도전 캐릭터로만 가능하지만, 획득한 보상은 <span className="text-white font-bold">메이플ID 내 월드 불문 전체 캐릭터 수령 가능</span>합니다.</p>
              <p>※ 대적자 코인을 제외한 모든 보상은 월드 내 캐릭터 간 이동 가능합니다. (사용 기한: 2026년 9월 24일 오전 2시)</p>
              <p>※ 연습 모드를 제외한 일반 파티 플레이 처치도 정상적으로 미션 완료 처리로 인정됩니다.</p>
            </div>
          </div>
        </section>

        {/* 4. 대적자 코인샵 및 활용 팁 */}
        <section id="coin-shop" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Coins className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. 대적자 코인샵 및 활용 팁</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">
              제네시스 패스 PLUS 프리미엄 티켓 효과를 통해 미션을 달성하고 모은 <span className="text-yellow-300 font-bold">대적자 코인은 메이플 ID 내 해방 완료 캐릭터</span>가 대적자 코인샵에서 다양한 핵심 소비형 강화 아이템으로 구매할 수 있습니다.
            </p>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                <p className="font-bold text-slate-100 text-lg flex items-center gap-2">🛍️ 판매 아이템 목록</p>
                <span className="text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                  구매 제한 없음 (무제한)
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: '대적자의 심연의 환생의 불꽃',
                    category: '소비',
                    price: '25',
                    desc: '장비에 심연의 환생의 불꽃 효과를 부여합니다.',
                    color: 'from-orange-500/15 to-amber-500/5 border-orange-500/20'
                  },
                  {
                    name: '대적자의 블랙 큐브',
                    category: '소비',
                    price: '25',
                    desc: '장비의 잠재능력을 새롭게 설정합니다.',
                    color: 'from-purple-500/15 to-indigo-500/5 border-purple-500/20'
                  },
                  {
                    name: '대적자의 화이트 에디셔널 큐브',
                    category: '소비',
                    price: '50',
                    desc: '장비의 에디셔널 잠재능력을 새롭게 설정합니다.',
                    color: 'from-cyan-500/15 to-blue-500/5 border-cyan-500/20'
                  }
                ].map((item) => (
                  <div key={item.name} className={`bg-gradient-to-br ${item.color} border rounded-xl p-4 flex flex-col justify-between shadow-md hover:scale-[1.01] transition-transform`}>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-md font-semibold text-slate-400">
                          {item.category}
                        </span>
                        <span className="text-[10px] bg-slate-900/60 text-slate-300 px-2 py-0.5 rounded-md font-medium">
                          월드 내 이동 가능
                        </span>
                      </div>
                      <p className="font-bold text-white text-[13px] sm:text-sm break-keep leading-snug mb-1">{item.name}</p>
                      <p className="text-[11px] sm:text-xs text-slate-400 break-keep mb-4">{item.desc}</p>
                    </div>
                    <div className="border-t border-slate-800/80 pt-3 mt-auto flex justify-between items-center">
                      <span className="text-xs text-slate-400">판매 가격</span>
                      <span className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-400 inline" /> {item.price}코인
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 코인 획득 계산기 정보 */}
            <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-5 space-y-3">
              <p className="font-extrabold text-purple-300 text-base flex items-center gap-2">💰 코인 획득량 & 구매 가능 수량 계산</p>
              <div className="text-sm text-slate-300 space-y-2">
                <p>
                  프리미엄 리워드(티켓 구매)까지 모두 활성화하고 모든 보스 처치 미션을 완료할 시, 총 <span className="text-yellow-400 font-bold text-base">10,500개</span>의 대적자 코인을 획득할 수 있습니다.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3">
                  <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 font-semibold mb-1">🔥 심연의 환생의 불꽃만 구매 시</p>
                    <p className="text-sm font-bold text-white">최대 <span className="text-orange-400">420개</span> 구매 가능</p>
                    <p className="text-[10px] text-slate-500 mt-1">(개당 25코인)</p>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 font-semibold mb-1">🟣 블랙 큐브만 구매 시</p>
                    <p className="text-sm font-bold text-white">최대 <span className="text-purple-400">420개</span> 구매 가능</p>
                    <p className="text-[10px] text-slate-500 mt-1">(개당 25코인)</p>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 font-semibold mb-1">🔵 화이트 에디셔널 큐브만 구매 시</p>
                    <p className="text-sm font-bold text-white">최대 <span className="text-cyan-400">210개</span> 구매 가능</p>
                    <p className="text-[10px] text-slate-500 mt-1">(개당 50코인)</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  ※ 대적자 코인샵은 구매 제한이 없으므로, 위 품목들을 유저 본인의 스펙업 계획에 맞춰 자유롭게 섞어서 구매하실 수 있습니다.
                </p>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/50 rounded-xl p-5">
              <p className="font-bold text-amber-300 mb-2">💡 효율적 활용 가이드</p>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li>대적자 코인은 해방을 완료한 메이플ID 내 모든 캐릭터가 <span className="font-bold text-white">2026년 9월 16일(수)</span>까지 공유 및 사용이 가능합니다.</li>
                <li>코인샵에서 구매한 아이템은 <span className="font-bold text-white">월드 내 캐릭터 간 이동 가능</span> 속성을 가지고 있습니다. 즉, 주력 부캐릭터에 큐브나 환불을 보내 유용하게 스펙업을 도와줄 수 있습니다.</li>
                <li>코인샵 구매 큐브 및 환불 아이템의 사용 유효 기한은 <span className="font-bold text-white">2026년 9월 24일(목) 오전 2시</span>까지입니다. 반드시 기한 만료 전에 사용해 소실되지 않도록 신경 써주세요!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. 이번 제네시스 패스가 역대급으로 쉬워진 이유! */}
        <section id="why-easier" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. 이번 제네시스 패스가 역대급으로 쉬워진 이유!</h2>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">
              이번 패치가 진행되며 제네시스 패스 도입과 더불어 <span className="text-yellow-300 font-semibold">보스 난이도 자체를 대폭 완화하는 파격적인 업데이트</span>가 함께 적용되었습니다. 해방 장벽이 수직 하락한 핵심 이유 3가지를 정리해 드립니다.
            </p>

            {/* 1. 보스 타임어택 20분 단축 & HP 대폭 칼질 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <p className="font-bold text-base text-purple-300 flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-200 rounded-md">이유 1</span>
                ⏳ 보스 타임어택 20분 단축 & HP 대폭 칼질!
              </p>
              <p className="text-sm text-slate-300">
                주간/월간 보스의 제한 시간이 기존 30분에서 <span className="text-white font-bold">20분으로 대폭 단축</span>되었습니다. 제한 시간만 줄어든 것이 아니라, 유저들이 타임아웃에 걸리지 않도록 보스의 체력(HP)을 파격적으로 하향 조정했습니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-xs">
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-center">
                  <p className="text-slate-400 font-semibold mb-1">일반 주/월간 보스 (카오스 자쿰 ~ 유피테르)</p>
                  <p className="text-base font-bold text-red-400">HP 약 31 ~ 33% 감소</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-center">
                  <p className="text-slate-400 font-semibold mb-1">하드 루시드</p>
                  <p className="text-base font-bold text-red-400">HP 약 28.5% 감소</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg text-center border-purple-500/30">
                  <p className="text-slate-400 font-semibold mb-1">🔥 하드 검은 마법사</p>
                  <p className="text-base font-bold text-purple-400">HP 무려 64.9% 감소!</p>
                </div>
              </div>

              <div className="bg-purple-950/20 border border-purple-900/40 rounded-lg p-3 text-xs text-purple-300">
                <span className="font-bold">💡 디테일 분석:</span> 체력이 30% 가까이 날아갔다는 것은, 기존에 아슬아슬하게 30분 꽉 채워 평딜로 잡던 스펙의 유저들도 20분 안에 충분히 컷할 수 있게 되었다는 뜻입니다. 특히 하드 검마의 체력이 60% 이상 썰려나가면서 해방 퀘스트의 난이도가 대폭 하락했습니다.
              </div>
            </div>

            {/* 2. 드디어 추가된 '페이즈별 연습 모드' */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <p className="font-bold text-base text-indigo-300 flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-200 rounded-md">이유 2</span>
                🎮 드디어 추가된 '페이즈별 연습 모드'
              </p>
              <p className="text-sm text-slate-300">
                수많은 유저들이 오랜 세월 요구했던 <span className="text-white font-bold">페이즈별 연습 모드</span>가 마침내 도입되어 보스 연습에 낭비되던 시간을 크게 절약할 수 있게 되었습니다.
              </p>
              <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside bg-slate-900/40 p-3.5 rounded-lg border border-slate-800">
                <li><span className="font-semibold text-white">적용 대상</span>: 스우(노멀) 이상 ~ 카링(하드) 이하의 특정 주간/월간 보스</li>
                <li><span className="font-semibold text-white">진입 조건</span>: 실전이나 전체 연습 모드에서 한 번이라도 진입해 본 페이즈만 선택 가능합니다. (예: 윌 3페이즈 연습을 위해서는 최소 1회 3페이즈에 도달한 기록 필요)</li>
                <li><span className="font-semibold text-white">활용 팁</span>: 페이즈별 연습모드를 이용하여 제네시스 해방 및 데스티니 1차 초월 미션을 연습할 수 있습니다. 단, 페이즈별 연습모드를 이용한 클리어는 미션 완료로 인정되지 않습니다. (전체 연습모드로 해야 인정 됩니다.)</li>
                <li className="text-slate-400">※ 챔피언 평가전, 데스티니 2차 초월 미션은 페이즈별 연습모드를 지원하지 않습니다.</li>
              </ul>
            </div>

            {/* 3. 보스 패턴 완호 패치 적용 */}
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 space-y-4">
              <p className="font-bold text-base text-pink-300 flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs bg-pink-500/20 text-pink-200 rounded-md">이유 3</span>
                🛡️ 보스 패턴 완화 패치 적용
              </p>
              <p className="text-sm text-slate-300">
                솔플 도전자들의 키보드를 부수게 만들었던 보스들의 악랄한 억까 패턴들이 완화 및 삭제되었습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <p className="font-bold text-white text-sm flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <span>🕷️</span> 거미의 왕 '윌' 대폭 너프
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li>'어둠의 집행자' 패턴 아예 삭제!</li>
                    <li>주시하는 눈동자 레이저에 피격되어도 달빛 게이지가 깎이지 않음.</li>
                    <li><span className="text-white font-semibold">2페이즈</span>: 밀쳐내기 패턴 피격 시 '혼란' 상태 이상 삭제, 장벽 데미지 10~11% 감소.</li>
                    <li><span className="text-white font-semibold">3페이즈</span>: 솔플 생존을 위협하던 심연의 거미줄 생성 속도가 <span className="text-yellow-300 font-semibold">"파티원 수에 비례하여 적을수록 느리게"</span> 생성되도록 변경!</li>
                  </ul>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2.5">
                  <p className="font-bold text-white text-sm flex items-center gap-1.5 border-b border-slate-800 pb-2">
                    <span>💀</span> 붉은 마녀 '진 힐라' 완화
                  </p>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                    <li><span className="text-white font-semibold">가시성 패치</span>: 제단 소환, 뼈 파동, 영혼 베기 등 즉사급 공격의 사전 예고 범위 이펙트와 경고 메시지(채집키 연타 안내 등)가 직관적으로 변경.</li>
                    <li><span className="text-white font-semibold">난이도 완화</span>: 회피 동선에 지장을 주던 '붉은 실'의 갯수가 약 14% 감소하여 회피 난이도 대폭 하락.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-white text-sm flex items-center gap-1.5 border-b border-slate-800 pb-2">
                  <span>🪐</span> 그 외 그란디스 상위 보스 완화
                </p>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside mt-2">
                  <li><span className="text-white font-semibold">카링 2페이즈</span>: 흑염 및 감전 지대가 소환되는 지점 위치 완화.</li>
                  <li><span className="text-white font-semibold">카링 3페이즈</span>: 행동 불가(바인드) 상태에 걸렸을 때, 악기 방출 패턴의 재사용 대기시간(쿨타임)이 흘러가지 않도록 수정되어 바인드 타임 중 무방비로 겹치는 패턴 연계 억까를 방지.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 9만점 계산기 바로가기 */}
        <div className="mt-8 flex justify-center">
          <Link 
            href="/calculator/genesis-liberation"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 hover:from-purple-500/35 hover:via-indigo-500/35 hover:to-pink-500/35 text-purple-200 hover:text-white border border-purple-500/30 hover:border-purple-500/50 rounded-xl font-bold transition-all shadow-lg shadow-indigo-950/40 text-sm md:text-base group"
          >
            ⚔️ 제네시스 해방 계산기 바로가기
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* 푸터 */}
        <footer className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
          <Link href="/blog" className="hover:text-purple-400">
            ← 블로그 목록으로 돌아가기
          </Link>
        </footer>
      </main>
    </div>
  );
}
