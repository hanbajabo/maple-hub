'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, Star, AlertTriangle, CheckCircle, Info, Sword, BookOpen, Trophy, Shield, Zap, Gift, ShoppingBag, BarChart3, ShoppingCart } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function ChallengersWorldSeason4Page() {
  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

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
            <span className="px-3.5 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">🌐 OVERDRIVE 업데이트</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              챌린저스 월드 시즌4 완벽 가이드 — OVERDRIVE
            </span>
          </h1>

          {/* 타이틀 이미지 */}
          <div className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-700/50 shadow-2xl shadow-purple-900/20">
            <img
              src="/challengers-world-season4-title.png"
              alt="챌린저스 월드 시즌 4"
              className="w-full h-auto object-cover"
            />
          </div>

          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-950/10 rounded-r-lg">
            2026년 6월 18일 오버드라이브와 함께 개막하는 <span className="text-white font-bold">챌린저스 월드 시즌4</span> — 테라 버닝 3캐릭터, 신규 시즌 보스 <span className="text-cyan-300 font-bold">메이린</span>, 솔 야누스 지원까지 모든 정보를 정리했습니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#overview', '01', '챌린저스 월드 기본 정보', 'text-cyan-400'],
                ['#meilin', '02', '신규 시즌 보스: 메이린', 'text-pink-400'],
                ['#missions', '03', '챌린저스 월드 미션 & 티어 보상', 'text-yellow-400'],
                ['#barrier', '04', '의문의 결계', 'text-emerald-400'],
                ['#pass', '05', '챌린저스 패스', 'text-orange-400'],
                ['#janus', '06', '솔 야누스 스킬 지원', 'text-purple-400'],
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

        {/* 1. 챌린저스 월드 기본 정보 */}
        <section id="overview" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Info className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 챌린저스 월드 기본 정보</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="w-full rounded-xl overflow-hidden border border-purple-800/40 shadow-lg">
              <img
                src="/challengers_world_banner.png"
                alt="챌린저스 월드 시즌4 — 2026년 6월 18일 ~ 9월 16일"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-cyan-300 mb-2 flex items-center gap-2"><Calendar className="w-4 h-4" /> 육성 기간</p>
                <p className="text-slate-300 text-sm">2026년 6월 18일(목) 점검 후 ~ <br/>9월 17일(목) 점검 전</p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-purple-300 mb-2 flex items-center gap-2"><Star className="w-4 h-4" /> 참여 대상</p>
                <p className="text-slate-300 text-sm">챌린저스 / 챌린저스2 / 챌린저스3 / 챌린저스4 월드 생성 캐릭터</p>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-800/50 rounded-xl p-5">
              <p className="font-bold text-amber-300 mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> 챌린저스 월드 리프 일정</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left min-w-[480px]">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-300 border-b border-slate-700">
                      <th className="px-3 py-2 font-bold">리프 단계</th>
                      <th className="px-3 py-2 font-bold">기간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr><td className="px-3 py-2">1차 사전 리프</td><td className="px-3 py-2">7/23(목) 점검 후 ~ 8/19(수) 오후 11:59</td></tr>
                    <tr className="bg-slate-900/20"><td className="px-3 py-2">2차 사전 리프</td><td className="px-3 py-2">8/20(목) 점검 후 ~ 9/16(수) 오후 11:59</td></tr>
                    <tr><td className="px-3 py-2">종료 리프</td><td className="px-3 py-2">9/17(목) 점검 후 ~ 9/30(수) 오후 11:59</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-3">🌐 월드별 리프 가능 월드</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left min-w-[480px]">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-300 border-b border-slate-700">
                      <th className="px-3 py-2 font-bold">월드</th>
                      <th className="px-3 py-2 font-bold">리프 가능 월드</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr><td className="px-3 py-2 font-semibold text-cyan-300">챌린저스 1~3</td><td className="px-3 py-2">스카니아, 베라, 루나, 제니스, 크로아, 유니온, 엘리시움, 이노시스, 레드, 오로라, 아케인, 노바</td></tr>
                    <tr className="bg-slate-900/20"><td className="px-3 py-2 font-semibold text-purple-300">챌린저스4</td><td className="px-3 py-2">에오스, 핼리오스</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-3">※ 최초 선택한 출발/도착 월드로만 이동 가능 | 리프 가능 캐릭터 최대 5개</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/30 to-cyan-950/20 border border-emerald-500/40 rounded-xl p-5 shadow-lg shadow-emerald-950/20">
              <p className="font-extrabold text-emerald-300 mb-3 flex items-center gap-2 text-base">
                <span className="text-lg">🏪</span> 월드 통합 메이플 옥션 & 메소마켓 운영 안내
              </p>

              {/* 메이플 옥션 이미지 */}
              <div className="w-full rounded-lg overflow-hidden border border-emerald-500/20 mb-4 bg-slate-900/60 p-1">
                <img
                  src="/maple_auction_info.png"
                  alt="메이플 옥션 월드 통합 예시"
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left min-w-[400px]">
                  <thead>
                    <tr className="bg-slate-900/90 text-slate-300 border-b border-emerald-500/30">
                      <th className="px-3 py-2.5 font-bold">그룹</th>
                      <th className="px-3 py-2.5 font-bold">포함 월드 (통합 거래 가능)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/30 text-slate-300">
                    <tr className="hover:bg-emerald-950/20 transition-colors">
                      <td className="px-3 py-3 font-bold text-cyan-300 text-sm">1그룹</td>
                      <td className="px-3 py-3 leading-relaxed">
                        스카니아, 베라, 루나, 제니스, 크로아, 유니온, 엘리시움, 이노시스, 레드, 오로라, 아케인, 노바, <span className="text-cyan-200 font-bold bg-cyan-950/50 px-1.5 py-0.5 rounded border border-cyan-800/50">챌린저스 1~3</span>
                      </td>
                    </tr>
                    <tr className="bg-emerald-950/10 hover:bg-emerald-950/20 transition-colors">
                      <td className="px-3 py-3 font-bold text-purple-300 text-sm">2그룹</td>
                      <td className="px-3 py-3 leading-relaxed">
                        에오스, 핼리오스, <span className="text-purple-300 font-bold bg-purple-950/50 px-1.5 py-0.5 rounded border border-purple-800/50">챌린저스 4</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-emerald-400/80 mt-3 flex items-center gap-1">
                <span>※</span> 챌린저스 월드는 지정된 그룹 내 기존 월드들과 옥션 및 메소마켓을 공유합니다.
              </p>
            </div>

            {/* 테라 버닝 */}
            <div className="bg-yellow-950/20 border border-yellow-800/50 rounded-xl p-5">
              <p className="font-bold text-yellow-300 mb-3 flex items-center gap-2"><Zap className="w-4 h-4" /> 테라 버닝 혜택</p>
              <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li>최대 <span className="text-white font-bold">3개</span>의 테라 버닝 캐릭터 생성 가능</li>
                <li>레벨업 시 +2레벨 추가 (최대 200레벨까지)</li>
                <li>챌린저스 월드에서 100레벨 이상 캐릭터 보유 시 제로 생성 가능</li>
              </ul>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  ['🐌 달팽이 펫', '30일 | 신비한 비밀 상자'],
                  ['⚔️ 30레벨 장비 상자', '30레벨 이상'],
                  ['🎁 전설의 비밀 상자', '100레벨 이상'],
                  ['🛡️ 기간제 루타비스 세트', '150레벨 이상'],
                  ['🏆 Eternal Flame 칭호', '200레벨 + 아케인포스 퀘스트 완료'],
                ].map(([item, cond]) => (
                  <div key={item as string} className="bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                    <p className="font-bold text-yellow-300 text-xs">{item}</p>
                    <p className="text-slate-400 text-xs mt-1">{cond}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 챌린저스 비기너 버프 티어 테이블 */}
            <div>
              <p className="font-bold text-slate-100 mb-3 text-base">⚡ 챌린저스 비기너 스킬 티어별 효과</p>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-xs text-left min-w-[700px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-3 font-bold">스탯</th>
                      <th className="px-3 py-3 font-bold text-slate-400">비기너</th>
                      <th className="px-3 py-3 font-bold text-amber-700">브론즈</th>
                      <th className="px-3 py-3 font-bold text-slate-300">실버</th>
                      <th className="px-3 py-3 font-bold text-yellow-400">골드</th>
                      <th className="px-3 py-3 font-bold text-blue-200">플래티넘</th>
                      <th className="px-3 py-3 font-bold text-emerald-400">에메랄드+</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">경험치</td><td className="px-3 py-2">1.5배</td><td className="px-3 py-2">1.5배</td><td className="px-3 py-2">1.5배</td><td className="px-3 py-2">1.5배</td><td className="px-3 py-2">1.5배</td><td className="px-3 py-2">1.5배</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">공격력/마력</td><td className="px-3 py-2">+50</td><td className="px-3 py-2">+50</td><td className="px-3 py-2">+55</td><td className="px-3 py-2">+60</td><td className="px-3 py-2">+70</td><td className="px-3 py-2">+80</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">일반 몬스터 데미지</td><td className="px-3 py-2">+100%</td><td className="px-3 py-2">+150%</td><td className="px-3 py-2">+150%</td><td className="px-3 py-2">+150%</td><td className="px-3 py-2">+150%</td><td className="px-3 py-2">+150%</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">보스 데미지</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+40%</td><td className="px-3 py-2">+50%</td><td className="px-3 py-2">+60%</td><td className="px-3 py-2">+70%</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">방어율 무시</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+40%</td><td className="px-3 py-2">+50%</td><td className="px-3 py-2">+60%</td><td className="px-3 py-2">+70%</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">크리티컬 확률</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">크리티컬 데미지</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+35%</td><td className="px-3 py-2">+40%</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">버프 지속시간</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+30%</td><td className="px-3 py-2">+60%</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">올스탯</td><td className="px-3 py-2">+50</td><td className="px-3 py-2">+50</td><td className="px-3 py-2">+60</td><td className="px-3 py-2">+70</td><td className="px-3 py-2">+90</td><td className="px-3 py-2">+100</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">최대 HP/MP</td><td className="px-3 py-2">+2500</td><td className="px-3 py-2">+2500</td><td className="px-3 py-2">+3000</td><td className="px-3 py-2">+3500</td><td className="px-3 py-2">+4500</td><td className="px-3 py-2">+5000</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">메획/아획</td><td className="px-3 py-2">-</td><td className="px-3 py-2">-</td><td className="px-3 py-2">-</td><td className="px-3 py-2">-</td><td className="px-3 py-2">-</td><td className="px-3 py-2 font-bold text-emerald-300">+20% (챌린저↑)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-2">※ 스탠스 +100%, 소환수 지속 +10%, 쿨타임 감소 5%, 길드 기여도 2배, 해방 룬 지속시간 +50% 전 티어 공통</p>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 2. 신규 시즌 보스: 메이린 */}
        <section id="meilin" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Sword className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 신규 시즌 보스: 메이린</h2>
          </div>

          {/* 메이린 보스 이미지 */}
          <div className="w-full rounded-xl overflow-hidden border border-pink-500/30 mb-6 shadow-lg shadow-pink-950/20">
            <img
              src="/boss_meilin_banner.png"
              alt="신규 시즌 보스 운명의 인도자 메이린"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">신비로운 카드로 운명을 내다보는 <span className="text-pink-300 font-bold">운명의 인도자 메이린</span>이 챌린저스 월드 전용 시즌 보스로 등장합니다. 메이플ID 당 매주 1회 클리어 가능하며 일반 주간 보스 처치 제한에 포함되지 않습니다.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-pink-800/30 rounded-xl p-4">
                <p className="font-bold text-pink-300 mb-2">⚔️ 노멀 메이린</p>
                <p className="text-slate-400 text-sm">참여 조건: 270레벨 이상 챌린저스 월드 캐릭터</p>
              </div>
              <div className="bg-slate-950/60 border border-red-800/30 rounded-xl p-4">
                <p className="font-bold text-red-300 mb-2">💀 하드 메이린</p>
                <p className="text-slate-400 text-sm">참여 조건: 280레벨 이상 챌린저스 월드 캐릭터</p>
              </div>
            </div>

            <div className="w-full rounded-xl overflow-hidden border border-pink-500/20 shadow-md">
              <img
                src="/boss_meilin_entry.png"
                alt="메이린 난이도 선택 카드"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-3">🗺️ 입장 방법</p>
              <p className="text-slate-300 text-sm">챌린저스 월드의 <span className="text-white font-semibold">헤네시스 / 이름 없는 마을 / 세르니움 광장 / 연구자들의 도시</span>에 위치한 <span className="text-cyan-300 font-bold">아네트 NPC</span>를 통해 입장</p>
            </div>

            <div>
              <p className="font-bold text-slate-100 mb-3">🎁 격파 미션 보상</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                  <table className="w-full text-xs sm:text-sm text-left min-w-[400px]">
                    <thead>
                      <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                        <th className="px-3 py-3 font-bold">격파 조건</th>
                        <th className="px-3 py-3 font-bold">획득 보상</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-slate-300">
                      <tr className="hover:bg-slate-900/30">
                        <td className="px-3 py-2 text-pink-300 font-semibold">노멀 격파</td>
                        <td className="px-3 py-2">운명의 인도자 성형/헤어 쿠폰 교환권 1개</td>
                      </tr>
                      <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                        <td className="px-3 py-2 text-red-300 font-semibold" rowSpan={3}>하드 격파</td>
                        <td className="px-3 py-2">운명의 인도자 의상 세트 교환권 1개</td>
                      </tr>
                      <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                        <td className="px-3 py-2">운명의 인도자 명찰/말풍선 반지 교환권 1개</td>
                      </tr>
                      <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                        <td className="px-3 py-2">위대한 메이린의 소울 상자 1개 (공격력/마력 3%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col items-center justify-center bg-slate-950/40 border border-slate-850 rounded-xl p-3 shadow-inner">
                  <img
                    src="/boss_meilin_rewards.png"
                    alt="운명의 인도자 착용샷"
                    className="w-full max-w-[180px] h-auto object-contain rounded-lg border border-purple-500/20"
                  />
                  <span className="text-xs text-slate-400 mt-2 font-semibold">운명의 인도자 착용샷</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>💎</span> 선착순 격파 미션 (하드 메이린)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
                {/* 왼쪽: 텍스트 및 상세 리스트 */}
                <div className="md:col-span-3 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/80">
                      <p className="text-cyan-300 font-bold text-xs mb-1">챌린저스 1~3 월드 통합</p>
                      <p className="text-base font-extrabold text-white">선착순 10명</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/80">
                      <p className="text-purple-300 font-bold text-xs mb-1">챌린저스4 월드</p>
                      <p className="text-base font-extrabold text-white">선착순 3명</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 rounded-lg p-4 border border-slate-800/50">
                    <p className="text-xs font-bold text-slate-400 mb-2">🎁 선착순 특별 보상 목록</p>
                    <ul className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                      <li>운명의 인도자 훈장 (영구)</li>
                      <li><span className="text-cyan-300 font-medium">잊혀진 성자의 다리 커스텀 배경 교환권</span></li>
                      <li>운명의 인도: 종언 피니시 어택 이펙트 교환권</li>
                      <li>금역의 저편 메이플홈 테마 교환권</li>
                    </ul>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    ※ 그린 PC 환경 + 비연습 모드에서만 참여 가능 | 기간: 6/18 ~ 7/22
                  </p>
                </div>

                {/* 오른쪽: 커스텀 배경 이미지 */}
                <div className="md:col-span-2 flex flex-col items-center justify-center bg-slate-950/40 border border-slate-850 rounded-xl p-3 shadow-inner">
                  <img
                    src="/boss_meilin_firstclear.png"
                    alt="잊혀진 성자의 다리 커스텀 배경 예시"
                    className="w-full h-auto object-contain rounded-lg border border-purple-500/20"
                  />
                  <span className="text-xs text-slate-400 mt-2 font-semibold text-center">잊혀진 성자의 다리 커스텀 배경 & 홈테마</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <p className="font-bold text-slate-100">📦 메이린 드롭 아이템</p>
              
              {/* 이미지 배치: 바로 아래에 테두리/박스/설명 없이 */}
              <div className="w-full max-w-2xl mx-auto">
                <img
                  src="/boss_meilin_drops.png"
                  alt="메이린 드롭 주요 아이템 예시"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* 드롭 아이템 리스트 */}
              <ul className="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li>황금 메소 주머니 (즉시 1,000만 메소 증가)</li>
                <li>변화하는 운명의 파편 (교환 가능) — 10개 = 에테르넬 방어구(모자/상의/하의/어깨) 1개</li>
                <li>운명의 에테르넬 방어구 상자 — 에테르넬 모자/상의/하의/어깨 중 1개 (7일)</li>
                <li>메이린의 에테르넬 방어구 상자 — 에테르넬 신발/장갑/망토 중 1개 (7일)</li>
                <li>메이린의 칠흑 장신구 상자 (7일)</li>
                <li>메이린의 하급/상급 솔 에르다 조각 상자 (7일)</li>
                <li>메이린의 소울 스킬: 그림자 검, 아퀼라</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. 챌린저스 월드 미션 */}
        <section id="missions" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 챌린저스 월드 미션 & 티어 보상</h2>
          </div>
          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            {/* 주간 성장 미션 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
              <p className="font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> 주간 성장 미션 (주 1회, 3개 중 1개만 달성)
              </p>

              {/* 이미지 배치: 바로 아래에 테두리/박스 없이 */}
              <div className="w-full max-w-2xl mx-auto">
                <img
                  src="/weekly_growth_mission.png"
                  alt="주간 성장 미션 UI"
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* 미션 테이블 (보상 칸 합침) */}
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs text-left min-w-[380px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-2.5 font-bold">미션 내용 (택 1)</th>
                      <th className="px-3 py-2.5 font-bold w-40 text-center">보상</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">레벨 범위 몬스터 5,000마리 처치</td>
                      <td className="px-3 py-2.5 text-center text-cyan-300 font-bold bg-slate-900/20" rowSpan={3}>
                        챌린저스 코인 1,500개
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">몬스터 파크 6회 완료</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">심볼 일일 퀘스트 12회 완료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-slate-400 space-y-1">
                <p>※ 3개의 미션 중 하나만 달성해도 주간 완료 처리가 가능합니다.</p>
                <p>※ 미완료 주간 미션은 10,000 메이플포인트로 1회 대체 가능 (주간 성장 패스)</p>
              </div>
            </div>

            {/* 시즌 미션 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div>
                <p className="font-bold text-emerald-300 flex items-center gap-2">
                  <Star className="w-4 h-4" /> 시즌 미션
                </p>
                <ul className="text-xs text-slate-400 list-disc list-inside mt-1.5 space-y-0.5">
                  <li>이벤트 기간 동안 캐릭터 성장을 통해 1회만 완료할 수 있습니다.</li>
                  <li>시즌 미션 달성 시 챌린저스 코인을 획득할 수 있습니다.</li>
                </ul>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs text-left min-w-[480px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-2.5 font-bold w-24">분류</th>
                      <th className="px-3 py-2.5 font-bold">시즌 미션</th>
                      <th className="px-3 py-2.5 font-bold text-center text-cyan-300 w-24">챌린저스 코인</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40 text-slate-300">
                    {/* 어빌리티 */}
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-purple-300 font-semibold" rowSpan={3}>어빌리티</td>
                      <td className="px-3 py-2.5">어빌리티 유니크 등급 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">어빌리티 레전드리 등급 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-slate-400">
                        어빌리티 재설정 후 아래 레전드리 어빌리티 중 하나 획득
                        <span className="block text-[10px] text-slate-500 mt-1 leading-normal">
                          · 보스 몬스터 공격 시 데미지 증가 · n% 확률로 재사용 대기시간 미적용 · 패시브 스킬 레벨 1 증가 · 버프 지속 시간 증가 · 공격력 · 마력
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>

                    {/* 아케인 포스 */}
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-cyan-300 font-semibold" rowSpan={4}>아케인 포스</td>
                      <td className="px-3 py-2.5">아케인 심볼 성장 레벨 총합 60레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">아케인 심볼 성장 레벨 총합 80레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">아케인 심볼 성장 레벨 총합 100레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">아케인 심볼 성장 레벨 총합 120레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>

                    {/* 어센틱 포스 */}
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-blue-300 font-semibold" rowSpan={5}>어센틱 포스</td>
                      <td className="px-3 py-2.5">어센틱 심볼 성장 레벨 총합 20레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">어센틱 심볼 성장 레벨 총합 25레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">어센틱 심볼 성장 레벨 총합 30레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">어센틱 심볼 성장 레벨 총합 35레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">어센틱 심볼 성장 레벨 총합 40레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>

                    {/* 장비 */}
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-amber-300 font-semibold" rowSpan={4}>장비</td>
                      <td className="px-3 py-2.5">잠재 능력 레전드리 엠블렘 장착</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">잠재 능력 레전드리 보조 무기 장착</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">에디셔널 잠재 능력 유니크 이상 엠블렘 장착</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">에디셔널 잠재 능력 유니크 이상 보조 무기 장착</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>

                    {/* 5차 스킬 */}
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-green-300 font-semibold" rowSpan={4}>5차 스킬</td>
                      <td className="px-3 py-2.5">직업 코어 2개 이상 30레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">직업 코어 4개 이상 30레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">강화 코어 2개 이상 60레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">강화 코어 4개 이상 60레벨 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>

                    {/* HEXA 스탯 */}
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-pink-300 font-semibold">HEXA 스탯</td>
                      <td className="px-3 py-2.5">HEXA 스탯 I 활성화</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>

                    {/* HEXA 스킬 */}
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-rose-300 font-semibold" rowSpan={6}>HEXA 스킬</td>
                      <td className="px-3 py-2.5">솔 에르다 조각 300개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">솔 에르다 조각 600개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">솔 에르다 조각 900개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">솔 에르다 조각 1,200개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">솔 에르다 조각 1,500개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">솔 에르다 조각 1,800개 이상 사용</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>

                    {/* 전투력 */}
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-red-300 font-semibold" rowSpan={5}>전투력</td>
                      <td className="px-3 py-2.5">전투력 1,000만 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">100</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">전투력 3,000만 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">전투력 5,000만 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold">300</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">전투력 7,000만 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">전투력 1억 달성</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>

                    {/* 무기 해방 */}
                    <tr className="border-t border-slate-700 hover:bg-slate-900/30">
                      <td className="px-3 py-2.5 text-violet-300 font-semibold" rowSpan={2}>무기 해방</td>
                      <td className="px-3 py-2.5">제네시스 1차 해방하기</td>
                      <td className="px-3 py-2.5 text-center font-bold text-yellow-300">500</td>
                    </tr>
                    <tr className="hover:bg-slate-900/30">
                      <td className="px-3 py-2.5">제네시스 2차 해방하기</td>
                      <td className="px-3 py-2.5 text-center font-bold text-orange-300">1,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 레벨 미션 요약 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-yellow-300 mb-3">📊 레벨 미션 (260~290레벨)</p>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs text-left min-w-[420px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-2.5 font-bold">레벨 구간</th>
                      <th className="px-3 py-2.5 font-bold">포인트(구간합)</th>
                      <th className="px-3 py-2.5 font-bold">코인(구간합)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">260 달성</td><td className="px-3 py-2 text-yellow-300">3,000P</td><td className="px-3 py-2">3,000</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">261~269 (9레벨)</td><td className="px-3 py-2">각 300P</td><td className="px-3 py-2">각 300</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">270~274 (5레벨)</td><td className="px-3 py-2">각 700P</td><td className="px-3 py-2">각 600</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">275~279 (5레벨)</td><td className="px-3 py-2">각 1,000P</td><td className="px-3 py-2">각 900</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">280~284 (5레벨)</td><td className="px-3 py-2">각 1,500P</td><td className="px-3 py-2">각 1,200</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">285~289 (5레벨)</td><td className="px-3 py-2">각 2,000P</td><td className="px-3 py-2">각 1,500</td></tr>
                    <tr className="border-t border-yellow-700/50 bg-yellow-950/10 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-yellow-300">290 달성</td><td className="px-3 py-2 font-bold text-yellow-300">5,000P</td><td className="px-3 py-2 font-bold text-yellow-300">2,500</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 보스 미션 전체 */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-red-300 mb-1 flex items-center gap-2"><Sword className="w-4 h-4" /> 보스 미션 (1인 파티, 연습 모드 인정)</p>
              <p className="text-xs text-slate-400 mb-3">📌 상위 난이도 격파 시 하위 난이도 보상(포인트+코인)도 모두 누적 지급됩니다!</p>
              <div className="overflow-x-auto rounded-lg border border-slate-800">
                <table className="w-full text-xs text-left min-w-[520px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-2.5 font-bold">보스명</th>
                      <th className="px-3 py-2.5 font-bold">난이도</th>
                      <th className="px-3 py-2.5 font-bold text-yellow-300">챌린저스 포인트</th>
                      <th className="px-3 py-2.5 font-bold">챌린저스 코인</th>
                      <th className="px-3 py-2.5 font-bold text-purple-300">상급 코인</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">자쿰</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">100</td><td className="px-3 py-2">100</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">피에르</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">200</td><td className="px-3 py-2">100</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">반반</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">200</td><td className="px-3 py-2">100</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">블러디퀸</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">200</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">매그너스</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">250</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">벨룸</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">250</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">파풀라투스</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">300</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">스우</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">400</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">스우</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">1,500</td><td className="px-3 py-2">400</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">데미안</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">400</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">데미안</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">1,500</td><td className="px-3 py-2">400</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">가디언 엔젤 슬라임</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">500</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">가디언 엔젤 슬라임</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">2,500</td><td className="px-3 py-2">600</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">루시드</td><td className="px-3 py-2 text-slate-400">이지</td><td className="px-3 py-2 font-bold text-yellow-300">500</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">루시드</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">1,000</td><td className="px-3 py-2">300</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">루시드</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">2,000</td><td className="px-3 py-2">600</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">윌</td><td className="px-3 py-2 text-slate-400">이지</td><td className="px-3 py-2 font-bold text-yellow-300">500</td><td className="px-3 py-2">200</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">윌</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">1,000</td><td className="px-3 py-2">300</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">윌</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">2,500</td><td className="px-3 py-2">600</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">카이</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">1,000</td><td className="px-3 py-2">300</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">더스크</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">1,000</td><td className="px-3 py-2">300</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">더스크</td><td className="px-3 py-2 text-slate-400">카오스</td><td className="px-3 py-2 font-bold text-yellow-300">2,500</td><td className="px-3 py-2">600</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">진 힐라</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">2,000</td><td className="px-3 py-2">600</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">진 힐라</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">3,000</td><td className="px-3 py-2">1,000</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">듄켈</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">1,000</td><td className="px-3 py-2">300</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">듄켈</td><td className="px-3 py-2 text-slate-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">3,000</td><td className="px-3 py-2">1,000</td><td className="px-3 py-2 text-slate-500">-</td></tr>
                    <tr className="border-t-2 border-slate-600 hover:bg-slate-900/30"><td className="px-3 py-2">검은 마법사</td><td className="px-3 py-2 text-red-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">6,000</td><td className="px-3 py-2">1,400</td><td className="px-3 py-2 text-purple-300 font-bold">20</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">선택받은 세렌</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">6,000</td><td className="px-3 py-2">1,400</td><td className="px-3 py-2 text-purple-300 font-bold">20</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">선택받은 세렌</td><td className="px-3 py-2 text-red-400">하드</td><td className="px-3 py-2 font-bold text-yellow-300">7,000</td><td className="px-3 py-2">2,000</td><td className="px-3 py-2 text-purple-300 font-bold">30</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">감시자 칼로스</td><td className="px-3 py-2 text-slate-400">이지</td><td className="px-3 py-2 font-bold text-yellow-300">7,000</td><td className="px-3 py-2">2,000</td><td className="px-3 py-2 text-purple-300 font-bold">30</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">감시자 칼로스</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">9,000</td><td className="px-3 py-2">3,000</td><td className="px-3 py-2 text-purple-300 font-bold">60</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">최초의 대적자</td><td className="px-3 py-2 text-slate-400">이지</td><td className="px-3 py-2 font-bold text-yellow-300">7,000</td><td className="px-3 py-2">2,000</td><td className="px-3 py-2 text-purple-300 font-bold">30</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2">최초의 대적자</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-yellow-300">9,000</td><td className="px-3 py-2">3,000</td><td className="px-3 py-2 text-purple-300 font-bold">60</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2">카링</td><td className="px-3 py-2 text-slate-400">이지</td><td className="px-3 py-2 font-bold text-yellow-300">9,000</td><td className="px-3 py-2">3,000</td><td className="px-3 py-2 text-purple-300 font-bold">60</td></tr>
                    <tr className="border-t-2 border-pink-700/50 bg-pink-950/10 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-pink-300">메이린 🆕</td><td className="px-3 py-2 text-slate-400">노멀</td><td className="px-3 py-2 font-bold text-pink-300">5,000</td><td className="px-3 py-2">1,200</td><td className="px-3 py-2 text-purple-300 font-bold">10</td></tr>
                    <tr className="bg-pink-950/20 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-pink-300">메이린 🆕</td><td className="px-3 py-2 text-red-400">하드</td><td className="px-3 py-2 font-bold text-pink-300">9,000</td><td className="px-3 py-2">3,000</td><td className="px-3 py-2 text-purple-300 font-bold">60</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 티어 달성 보상 */}
            <div>
              <p className="font-bold text-slate-100 mb-3 text-base">🏅 챌린저스 월드 시즌4 티어 달성 보상</p>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-xs sm:text-sm text-left min-w-[560px] border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-3 font-bold">티어</th>
                      <th className="px-3 py-3 font-bold">필요 포인트</th>
                      <th className="px-3 py-3 font-bold">주요 보상</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-amber-700">브론즈</td><td className="px-3 py-2">5,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 브론즈 훈장 교환권, <span className="text-cyan-300 font-bold">솔 에르다 조각 100개, 솔 에르다 3개</span>, <span className="text-yellow-300 font-bold">챌린저스 휘장로이드 교환권</span>, 챌린저스 월드 시즌4 브론즈 모자, <span className="text-yellow-300 font-bold">챌린저스 3레벨 특수 스킬 반지 선택권</span></td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-slate-300">실버</td><td className="px-3 py-2">10,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 실버 훈장 교환권, <span className="text-yellow-300 font-bold">챌린저스 4레벨 특수 스킬 반지 선택권</span>, <span className="text-cyan-300 font-bold">솔 에르다 조각 100개, 솔 에르다 3개</span>, 챌린저스 월드 시즌4 실버 모자</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-yellow-400">골드</td><td className="px-3 py-2">15,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 골드 훈장 교환권, <span className="text-cyan-300 font-bold">솔 에르다 조각 100개, 솔 에르다 3개</span>, <span className="text-yellow-300 font-bold">페어리 하트</span>, 챌린저스 월드 시즌4 골드 모자</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-blue-200">플래티넘</td><td className="px-3 py-2">20,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 플래티넘 훈장 교환권, <span className="text-cyan-300 font-bold">솔 에르다 조각 300개, 솔 에르다 5개</span>, 챌린저스 월드 시즌4 플래티넘 모자</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-emerald-400">에메랄드</td><td className="px-3 py-2">30,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 에메랄드 훈장 교환권, <span className="text-red-400 font-bold">200레벨 달성의 비약 20개</span>, <span className="text-green-400 font-bold">카르마 레전드리 잠재능력 부여 스크롤 100% (200제)</span>, <span className="text-yellow-300 font-bold">카르마 블랙 큐브 30개</span>, 챌린저스 월드 시즌4 에메랄드 모자</td></tr>
                    <tr className="bg-slate-900/10 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-blue-300">사파이어</td><td className="px-3 py-2">40,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 사파이어 훈장 교환권, <span className="text-yellow-300 font-bold">카르마 에디셔널 유니크 잠재능력 부여 스크롤 100% (200제)</span>, <span className="text-green-400 font-bold">카르마 레전드리 잠재능력 부여 스크롤 100% (200제)</span>, 챌린저스 월드 시즌4 사파이어 모자</td></tr>
                    <tr className="hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-cyan-200">다이아몬드</td><td className="px-3 py-2">50,000</td><td className="px-3 py-2">챌린저스 월드 시즌4 다이아몬드 훈장 교환권, <span className="text-yellow-300 font-bold">카르마 화이트 에디셔널 큐브 30개, 하트 업그레이드 모듈: 플라즈마</span>, 챌린저스 월드 시즌4 다이아몬드 모자</td></tr>
                    <tr className="bg-slate-900/10 border-t-2 border-purple-700/50 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-purple-300">마스터</td><td className="px-3 py-2">70,000 + 메이린(노멀)</td><td className="px-3 py-2">챌린저스 월드 시즌4 마스터 훈장 교환권, <span className="text-yellow-300 font-bold">카르마 블랙 큐브 30개, 카르마 화이트 에디셔널 큐브 30개, 메멘토 방어구 스타포스 18성 강화권 (200제) 3개</span>, <span className="text-red-400 font-bold">250레벨 달성의 비약 1개</span>, 챌린저스 월드 시즌4 마스터 모자</td></tr>
                    <tr className="hover:bg-slate-900/30 bg-purple-950/10"><td className="px-3 py-2 font-bold text-pink-300">챌린저</td><td className="px-3 py-2">90,000 + 메이린(하드)</td><td className="px-3 py-2">챌린저스 월드 시즌4 챌린저 훈장 교환권, <span className="text-yellow-300 font-bold">챌린저스 월드 시즌4 챌린저 가구 교환권</span>, <span className="text-red-400 font-bold">솔 야누스 스킬 강화권 (20레벨)</span>, 챌린저스 월드 시즌4 챌린저 모자</td></tr>
                    <tr className="bg-purple-950/20 hover:bg-slate-900/30"><td className="px-3 py-2 font-bold text-amber-300">슈퍼챌린저</td><td className="px-3 py-2">랭킹 상위 (1~999/1~50)</td><td className="px-3 py-2">챌린저스 월드 시즌4 슈퍼챌린저 훈장 교환권, <span className="text-yellow-300 font-bold">챌린저스 월드 시즌4 슈퍼챌린저 가구 교환권</span>, <span className="text-red-400 font-bold">솔 야누스 스킬 강화권 (20레벨)</span>, 챌린저스 월드 시즌4 슈퍼챌린저 모자</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 mt-2">※ 마스터 이상 보상은 원하는 월드에서 수령 가능 (챌린저스1~3은 에오스/핼리오스 제외)</p>
              <p className="text-xs text-slate-400 mt-1">※ 슈퍼챌린저를 1등 ~ 10등으로 달성할 경우, 1st 슈퍼챌린저 ~ 10th 슈퍼챌린저 훈장을 획득할 수 있습니다.</p>
              
              {/* 챌린저 달성 시 누적 획득 보상 (훈장/모자 제외) */}
              <div className="mt-6 bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5 shadow-lg shadow-indigo-900/10">
                <p className="font-bold text-indigo-300 mb-4 flex items-center gap-2 text-base">🎁 챌린저 달성 시 누적 획득 보상 <span className="text-xs text-slate-400 font-normal ml-1 bg-slate-900 px-2 py-1 rounded-md border border-slate-700">(훈장/모자류 제외)</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span> <span className="text-cyan-300 font-bold">솔 에르다 조각 600개</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"></span> <span className="text-cyan-300 font-bold">솔 에르다 14개</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 카르마 블랙 큐브 60개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 카르마 화이트 에디셔널 큐브 60개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400/80"></span> <span className="text-green-400 font-bold">카르마 레전드리 잠재능력 부여 스크롤 100% (200제) 2개</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 카르마 에디셔널 유니크 잠재능력 부여 스크롤 100% (200제) 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span> <span className="text-red-400 font-bold">200레벨 달성의 비약 20개</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span> <span className="text-red-400 font-bold">250레벨 달성의 비약 1개</span></div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 메멘토 방어구 스타포스 18성 강화권 (200제) 3개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 하트 업그레이드 모듈: 플라즈마 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 페어리 하트 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 챌린저스 3레벨 특수 스킬 반지 선택권 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 챌린저스 4레벨 특수 스킬 반지 선택권 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 챌린저스 휘장로이드 교환권 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400/80"></span> 챌린저스 월드 시즌4 챌린저 가구 교환권 1개</div>
                  <div className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400/80"></span> <span className="text-red-400 font-bold">솔 야누스 스킬 강화권 (20레벨) 1개</span></div>
                </div>
              </div>
              
              {/* 9만 점 달성 공략 및 2가지 맞춤형 루트 */}
              <div className="mt-8 border-t border-slate-800/80 pt-6 space-y-6 text-sm sm:text-base text-slate-300">
                <div>
                  <p className="font-bold text-slate-100 text-base mb-2">💡 9만 점 달성 전략 가이드</p>
                  <p className="leading-relaxed">
                    9만 점 달성과 '슈퍼챌린저/챌린저' 등급 획득을 위해서는 <span className="text-pink-300 font-bold">하드 메이린 격파(필수 조건)</span>가 선행되어야 하므로, 이를 기본 베이스로 깔고 플레이 성향에 따른 2가지 맞춤형 공략 루트를 계산해 보았습니다.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
                  <p className="font-bold text-slate-100 mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-indigo-400" /> 📊 기본 베이스 (공통 획득 포인트)</p>
                  <p className="text-xs text-slate-400 mb-2">어떤 루트를 타든 기본적으로 챙겨야 하는 포인트입니다.</p>
                  <ul className="space-y-1.5 list-disc list-inside text-sm text-slate-300">
                    <li>기본 보스 올킬 (하드 검은 마법사까지): <span className="text-white font-bold">35,300점</span></li>
                    <li>신규 보스 메이린 (노멀 + 하드): <span className="text-white font-bold">14,000점</span></li>
                    <li className="list-none border-t border-slate-800/80 mt-2 pt-2 text-indigo-300 font-bold text-base">
                      기본 베이스 합계: 49,300점 <span className="text-slate-400 text-xs font-normal">(목표 90,000점까지 40,700점 추가 필요)</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {/* 루트 A */}
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/50 transition-all">
                    <p className="font-bold text-cyan-300 mb-2 text-base flex items-center gap-2">🚀 루트 A: [정석 밸런스형] 레벨 280 + 그란디스 중위권 격파</p>
                    <p className="text-xs text-slate-400 mb-3">가장 많은 유저들이 현실적으로 선택할 수 있는 밸런스형 스펙업 루트입니다. 사냥 피로도를 적당히 조절하면서 보스 컨트롤로 승부를 봅니다.</p>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>• <span className="font-semibold text-white">목표 레벨:</span> 280레벨 <span className="text-cyan-400 font-bold">(누적 15,700점 획득)</span></p>
                      <div>
                        <p>• <span className="font-semibold text-white">추가 보스 컷:</span></p>
                        <ul className="pl-4 list-disc list-inside space-y-1 text-slate-400 mt-1">
                          <li>노멀/하드 선택받은 세렌 (13,000점)</li>
                          <li>이지 감시자 칼로스 (7,000점)</li>
                          <li>이지 최초의 대적자 (7,000점)</li>
                        </ul>
                      </div>
                      <p className="border-t border-slate-800/80 pt-2 mt-2 font-bold text-cyan-200">
                        최종 점수: 49,300 + 15,700 + 27,000 = 92,000점 (목표 달성!)
                      </p>
                      <p className="text-xs text-slate-400 mt-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                        <span className="font-semibold text-cyan-300">공략 포인트:</span> 280레벨까지만 챌린저스 월드의 파격적인 버닝 혜택으로 빠르게 밀어올린 뒤, 챌린저스 비기너 버프와 의문의 결계에서 나오는 스펙을 영혼까지 끌어모아 이지 칼로스/대적자 최소 컷을 맞추는 데 집중해야 합니다.
                      </p>
                    </div>
                  </div>

                  {/* 루트 B */}
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700/50 transition-all">
                    <p className="font-bold text-yellow-300 mb-2 text-base flex items-center gap-2">🔥 루트 B: [우직한 사냥 머신형] 레벨 285 + 그란디스 진입만</p>
                    <p className="text-xs text-slate-400 mb-3">복잡한 그란디스 상위 보스 패턴을 외우기 싫거나 컨트롤에 자신이 없는 분들을 위한 '시간 갈아 넣기' 루트입니다.</p>
                    <div className="space-y-2 text-sm text-slate-300">
                      <p>• <span className="font-semibold text-white">목표 레벨:</span> 285레벨 <span className="text-yellow-400 font-bold">(누적 23,700점 획득)</span></p>
                      <div>
                        <p>• <span className="font-semibold text-white">추가 보스 컷:</span></p>
                        <ul className="pl-4 list-disc list-inside space-y-1 text-slate-400 mt-1">
                          <li>노멀 선택받은 세렌 (6,000점)</li>
                          <li>이지 감시자 칼로스 (7,000점)</li>
                          <li>이지 최초의 대적자 (7,000점) <span className="text-slate-500">또는</span> 하드 세렌 (7,000점)</li>
                        </ul>
                      </div>
                      <p className="border-t border-slate-800/80 pt-2 mt-2 font-bold text-yellow-200">
                        최종 점수: 49,300 + 23,700 + 20,000 = 93,000점 (목표 달성!)
                      </p>
                      <p className="text-xs text-slate-400 mt-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                        <span className="font-semibold text-yellow-300">공략 포인트:</span> 솔 야누스 30레벨 지원을 100% 활용해 넷플릭스나 유튜브를 보며 우직하게 사냥만 하는 방식입니다. 보스는 노멀 세렌, 이지 칼로스와 더불어 본인 직업 상성에 맞게 이지 대적자나 하드 세렌 중 하나를 선택해 컷하면 되므로, 285레벨의 높은 레벨 반감 우위를 앞세워 딜로 찍어 누를 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <Link 
                  href="/calculator/challengers-season4"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 hover:from-cyan-500/35 hover:via-indigo-500/35 hover:to-purple-500/35 text-cyan-200 hover:text-white border border-cyan-500/30 hover:border-cyan-500/50 rounded-xl font-bold transition-all shadow-lg shadow-indigo-950/40 text-sm md:text-base group"
                >
                  🧮 챌린저스 시즌4 계산기 바로가기
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 4. 의문의 결계 */}
        <section id="barrier" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. 의문의 결계</h2>
          </div>
          <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">챌린저스 월드 전용 콘텐츠. <span className="text-white font-bold">200레벨 이상 + 아케인포스 퀘스트 완료</span> 캐릭터가 참여 가능합니다. 매일 오전 0시 결계 제어봉 <span className="text-emerald-300 font-bold">3개 자동 지급</span> (최대 보유 20개).</p>

            {/* 의문의 결계 이미지 */}
            <div className="w-full max-w-2xl mx-auto my-4 border border-slate-700/50 rounded-xl overflow-hidden shadow-md">
              <img
                src="/mysterious-barrier.png"
                alt="의문의 결계 UI 및 결계의 핵"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-3">🔮 티어별 결계 단계 및 핵 등장 확률</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                      <th className="px-3 py-2">단계 (해제 조건)</th>
                      <th className="px-3 py-2">노멀</th>
                      <th className="px-3 py-2">레어</th>
                      <th className="px-3 py-2">에픽</th>
                      <th className="px-3 py-2">유니크</th>
                      <th className="px-3 py-2">레전드리</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr><td className="px-3 py-2">1단계: 초소형 (골드 미만)</td><td className="px-3 py-2">67.49%</td><td className="px-3 py-2">30.45%</td><td className="px-3 py-2">2.03%</td><td className="px-3 py-2">0.023%</td><td className="px-3 py-2 text-amber-300">0.007%</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2">2단계: 소형 (골드 이상)</td><td className="px-3 py-2">52.60%</td><td className="px-3 py-2">31.40%</td><td className="px-3 py-2">15.70%</td><td className="px-3 py-2">0.25%</td><td className="px-3 py-2 text-amber-300">0.05%</td></tr>
                    <tr><td className="px-3 py-2">3단계: 중형 (에메랄드 이상)</td><td className="px-3 py-2">49.95%</td><td className="px-3 py-2">29.95%</td><td className="px-3 py-2">14.95%</td><td className="px-3 py-2">5.05%</td><td className="px-3 py-2 text-amber-300">0.10%</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2">4단계: 대형 (사파이어 이상)</td><td className="px-3 py-2">-</td><td className="px-3 py-2">29.95%</td><td className="px-3 py-2">62.88%</td><td className="px-3 py-2">6.65%</td><td className="px-3 py-2 text-amber-300">0.52%</td></tr>
                    <tr><td className="px-3 py-2">5단계: 초대형 (다이아 이상)</td><td className="px-3 py-2">-</td><td className="px-3 py-2">-</td><td className="px-3 py-2">91.85%</td><td className="px-3 py-2">7.10%</td><td className="px-3 py-2 text-amber-300">1.05%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-emerald-300 mb-2">⚡ 결계의 핵 시스템</p>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>장착 시 직업에 맞는 능력치 획득</li>
                  <li>최대 12단계까지 강화 가능</li>
                  <li>더 높은 희귀도 장착 시 기존 핵은 추출 → 결계 에너지 획득</li>
                  <li>리프 후에는 능력치 미적용</li>
                </ul>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-purple-300 mb-2">🔧 결계의 핵 강화 확률</p>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside">
                  <li>1→2단계: 100% 성공</li>
                  <li>3→4단계: 80% 성공</li>
                  <li>5→6단계: 50% 성공</li>
                  <li>6→7단계: 20% 성공</li>
                  <li>7→8단계: 10% 성공</li>
                  <li>11→12단계: 0.7% 성공</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 챌린저스 패스 */}
        <section id="pass" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Gift className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. 챌린저스 패스</h2>
          </div>
          <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">260레벨 이상 챌린저스 월드 캐릭터 참여 가능. 패스 레벨 0~30, 레벨당 <span className="text-orange-300 font-bold">100 포인트</span> 필요. 주당 최대 <span className="text-orange-300 font-bold">500 포인트</span> 획득 가능.</p>

            {/* 챌린저스 패스 이미지 */}
            <div className="w-full max-w-2xl mx-auto my-4 border border-slate-700/50 rounded-xl overflow-hidden shadow-md">
              <img
                src="/challengers-pass.png"
                alt="챌린저스 패스 UI"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-orange-300 mb-3">📅 주간 미션 (포인트 획득)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left min-w-[360px]">
                  <thead><tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300"><th className="px-3 py-2">주간 미션</th><th className="px-3 py-2">포인트</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {['일일 접속 1/3/5회', '에픽던전 1회 클리어', '몬스터파크 7회 클리어', '주간 보스 6/12회 처치', '레벨 범위 몬스터 1만/2만/3만/4만마리'].map((m, i) => (
                      <tr key={i} className={i%2===1?"bg-slate-900/10":""}><td className="px-3 py-2">{m}</td><td className="px-3 py-2 text-orange-300 font-bold">각 100P</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-center">
                <p className="font-bold text-slate-300 mb-1 text-sm">무료 패스</p>
                <p className="text-xs text-slate-400">기본 지원 물품</p>
              </div>
              <div className="bg-orange-950/30 border border-orange-700/50 rounded-xl p-4 text-center">
                <p className="font-bold text-orange-300 mb-1 text-sm">챌린저스 EXP 패스</p>
                <p className="text-orange-400 font-bold">19,800 넥슨캐시</p>
                <p className="text-xs text-slate-400 mt-1">일반 몬스터 데미지 +200% | 추가 경험치 +20%</p>
              </div>
              <div className="bg-purple-950/30 border border-purple-700/50 rounded-xl p-4 text-center">
                <p className="font-bold text-purple-300 mb-1 text-sm">챌린저스 프리미엄 패스</p>
                <p className="text-purple-400 font-bold">19,800 넥슨캐시</p>
                <p className="text-xs text-slate-400 mt-1">EXP 패스 구매 후 구매 가능</p>
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-3">🎁 주요 레벨 보상 하이라이트</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left min-w-[560px]">
                  <thead><tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300"><th className="px-3 py-2">레벨</th><th className="px-3 py-2">무료</th><th className="px-3 py-2 text-orange-300">EXP 패스</th><th className="px-3 py-2 text-purple-300">프리미엄 패스</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr><td className="px-3 py-2 text-slate-400">Lv.1</td><td className="px-3 py-2">VIP 부스터 5개</td><td className="px-3 py-2 text-orange-300">블루베리 농장 입장권 1개</td><td className="px-3 py-2 text-purple-300">경험치 4배 쿠폰 (30분) 2개</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2 text-slate-400">Lv.4</td><td className="px-3 py-2">솔 에르다 조각 15개</td><td className="px-3 py-2 text-orange-300">상급 EXP 교환권 1,000개</td><td className="px-3 py-2 text-purple-300">스페셜 명예의 훈장 100개</td></tr>
                    <tr><td className="px-3 py-2 text-slate-400">Lv.14</td><td className="px-3 py-2">카르마 검은 환생의 불꽃 10개</td><td className="px-3 py-2 text-orange-300">상급 EXP 교환권 1,000개</td><td className="px-3 py-2 text-purple-300">카르마 검은 환생의 불꽃 100개</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2 text-slate-400">Lv.24</td><td className="px-3 py-2">카르마 검은 환생의 불꽃 10개</td><td className="px-3 py-2 text-orange-300">상급 EXP 교환권 1,000개</td><td className="px-3 py-2 font-bold text-purple-300">카르마 블랙 큐브 20개</td></tr>
                    <tr><td className="px-3 py-2 text-slate-400">Lv.29</td><td className="px-3 py-2">카르마 검은 환생의 불꽃 10개</td><td className="px-3 py-2 text-orange-300">상급 EXP 교환권 1,000개</td><td className="px-3 py-2 font-bold text-purple-300">카르마 화이트 에디셔널 큐브 20개</td></tr>
                    <tr className="border-t-2 border-orange-700/50 bg-orange-950/10"><td className="px-3 py-2 font-bold text-orange-300">Lv.30 🏆</td><td className="px-3 py-2">상급 EXP 교환권 2,000개</td><td className="px-3 py-2 text-orange-300">성장의 비약 (200~279) 1개</td><td className="px-3 py-2 font-bold text-purple-300">솔 에르다/조각 선택권 5개</td></tr>
                  </tbody>
                </table>
              </div>

              {/* 챌린저스 패스 상세 보상 이미지 */}
              <div className="w-full mt-5 border border-slate-700/50 rounded-xl overflow-hidden shadow-md bg-slate-950">
                <img
                  src="/challengers-pass-rewards.png"
                  alt="챌린저스 패스 전체 보상 UI"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* 블루베리 농장 설명 */}
              <div className="mt-8 border-t border-slate-800/80 pt-6">
                <p className="font-bold text-slate-100 mb-3 flex items-center gap-2 text-base">🍇 미호의 블루베리 농장</p>
                <p className="text-sm text-slate-300 mb-4">미호의 블루베리 농사를 도와주고 대량의 경험치를 획득하세요!</p>
                
                <div className="w-full max-w-sm mx-auto my-5 border border-slate-700/50 rounded-xl overflow-hidden shadow-md bg-slate-950">
                  <img
                    src="/blueberry-farm.png"
                    alt="블루베리 농장 입장권"
                    className="w-full h-auto object-contain"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                    <p className="font-bold text-orange-300 mb-2">■ 이벤트 참여 대상</p>
                    <p className="leading-relaxed text-slate-300">
                      260레벨 이상 300레벨 미만의 캐릭터 또는 스토리 퀘스트 챕터2를 완료한 260레벨 이상 300레벨 미만의 제로 캐릭터
                    </p>
                  </div>
                  
                  <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
                    <p className="font-bold text-cyan-300 mb-2">■ 이벤트 참여 방법</p>
                    <ul className="space-y-1 list-disc list-inside leading-relaxed text-slate-300">
                      <li>‘블루베리 농장 입장권’ 사용 시 이벤트 리스트의 ‘블루베리 농장’을 통해 &lt;블루베리 농장 입구&gt;로 이동</li>
                      <li className="text-slate-400 list-none text-[11px] pl-3">※ ‘블루베리 농장 입장권’은 챌린저스 패스에서 획득 가능</li>
                      <li>‘블루베리 농장 입구’의 NPC 미호에게 말을 걸어 입장</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-purple-950/10 border border-purple-900/30 rounded-xl p-4 text-xs sm:text-sm text-slate-300">
                  <p className="font-bold text-purple-300 mb-2">■ 블루베리 농장 진행 및 유의사항</p>
                  <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-300">
                    <li>제한 시간 30분 동안 대량의 블루베리를 처치하여 수확을 돕고 경험치 획득</li>
                    <li className="text-slate-400 pl-3 list-none text-[11px]">※ 입장권 사용 시점부터 최대 24시간 동안 블루베리 농장에 입장 가능</li>
                    <li className="text-slate-400 pl-3 list-none text-[11px]">※ 어떠한 추가 경험치 효과도 적용되지 않으며, 멀티킬이 발생하지 않음</li>
                    <li className="text-slate-400 pl-3 list-none text-[11px]">※ 자이언트 블루베리를 처치하여 수확 진행률이 100%에 도달하면 자동 퇴장</li>
                    <li className="text-slate-400 pl-3 list-none text-[11px] font-semibold text-yellow-300/90">※ 캐릭터가 280 레벨 이상인 경우, 279 레벨과 동일한 양의 경험치를 획득</li>
                    <li>수확 진행률 100% 전 퇴장 시, 농장 이용 제한 시간 전까지는 자유롭게 재입장 가능</li>
                    <li className="text-slate-400 pl-3 list-none text-[11px]">※ 농장 이용 제한 시간이 모두 지나거나 수확 진행률 100% 도달 후 다음 입장권 사용 가능</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. 솔 야누스 스킬 지원 */}
        <section id="janus" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. 솔 야누스 스킬 지원</h2>
          </div>
          <div className="space-y-5 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="bg-purple-950/20 border border-purple-800/50 rounded-xl p-5">
              <p className="font-bold text-purple-300 mb-3 flex items-center gap-2"><Star className="w-4 h-4" /> 핵심 혜택</p>
              <p className="text-slate-300">챌린저스 월드에서 <span className="text-white font-bold">솔 야누스 스킬을 30레벨로 즉시 지원</span>해드립니다.</p>

              {/* 솔 야누스 지원 이미지 */}
              <div className="w-full my-4 border border-purple-800/30 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/sol-janus-support.png"
                  alt="솔 야누스 스킬 30레벨 지원"
                  className="w-full h-auto object-contain"
                />
              </div>

              <ul className="mt-3 text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li><span className="text-white font-bold">참여 조건:</span> <span className="text-yellow-300 font-bold">[6차] 새로운 힘 퀘스트 완료 + 260레벨 이상</span></li>
                <li><span className="text-white font-bold">명의 당 1개 캐릭터만 참여</span> <span className="text-red-400 font-bold">(변경 불가)</span></li>
                <li>솔 야누스 스킬이 30레벨 미만인 캐릭터만 참여 가능</li>
                <li>챌린저스 월드 운영 기간 동안만 30레벨 효과 유지</li>
                <li>일반 월드 리프 또는 이벤트 종료 시 기존 레벨로 복귀</li>
              </ul>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <p className="font-bold text-slate-100 mb-3">📈 솔 야누스 스킬 강화권 (20레벨) 사용 결과</p>
              <p className="text-xs text-slate-400 mb-3">※ 챌린저/슈퍼챌린저 티어 달성 보상</p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left min-w-[340px]">
                  <thead><tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300"><th className="px-3 py-2">사용 전 레벨</th><th className="px-3 py-2">사용 후 레벨</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    <tr><td className="px-3 py-2">0~3</td><td className="px-3 py-2 text-purple-300 font-bold">20</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2">4~7</td><td className="px-3 py-2 text-purple-300 font-bold">21</td></tr>
                    <tr><td className="px-3 py-2">8~9</td><td className="px-3 py-2 text-purple-300 font-bold">22</td></tr>
                    <tr className="bg-slate-900/10"><td className="px-3 py-2">14~15</td><td className="px-3 py-2 text-purple-300 font-bold">25</td></tr>
                    <tr><td className="px-3 py-2">22~29</td><td className="px-3 py-2 font-bold text-yellow-300">30 (MAX)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 유의사항 */}
        <section className="mb-14 bg-red-950/20 border border-red-900/50 rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-5 border-b border-red-900/50 pb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-bold text-red-300">⚠️ 주요 유의사항</h2>
          </div>
          <ul className="text-sm text-slate-300 space-y-2.5 list-disc list-inside leading-relaxed break-keep">
            <li>챌린저스1~4 중 <span className="text-white font-bold">최초 생성 월드 한 곳만</span> 이용 가능 (삭제해도 변경 불가)</li>
            <li>육성 기간 종료 시 <span className="text-red-300 font-bold">리프하지 않은 캐릭터 및 아이템 전체 삭제</span></li>
            <li>리프 시 캐시 보관함, 창고, 메이플 옥션 아이템은 이동 불가</li>
            <li>101레벨 이상만 월드 리프 가능 (제로: 챕터 2 완료 필수)</li>
            <li>링크 스킬 전수, 메이플 유니온, 유니온 아티팩트 등 사용 불가</li>
            <li>챌린저스 샵 구매 메멘토 큐브, 카르마 스타포스 17성 강화권은 챌린저스 전용 (리프 불가)</li>
            <li>메소마켓 거래 중인 캐릭터는 월드 리프 불가</li>
            <li><span className="text-white font-bold">200레벨/250레벨 달성의 비약은 챌린저스 월드에서 사용 불가</span></li>
          </ul>
        </section>

        {/* 챌린저스 샵 */}
        <section className="mb-14 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
            <ShoppingBag className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-100">🛒 챌린저스 샵 물품 총정리</h2>
          </div>
          
          <div className="mb-6 text-sm text-slate-300 leading-relaxed break-keep">
            <p>
              이번 챌린저스 샵은 캐릭터 성장에 필수적인 스펙업 아이템들로 꽉꽉 채워져 있습니다. 특히 코인 획득처에 따라 <span className="font-bold text-yellow-300">[일반]</span> 탭과 <span className="font-bold text-purple-300">[스페셜]</span> 탭으로 나뉘며, 요구하는 코인의 종류가 다르니 구매 계획을 세울 때 꼭 참고해 주세요!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <p className="font-bold text-yellow-300 mb-2">🪙 1. [일반 탭] 판매 물품 리스트</p>
              <p className="text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">사용 재화: 챌린저스 코인 (레벨업 및 보스 격파, 미션으로 획득)</p>
              <ul className="space-y-1 list-disc list-inside text-xs">
                <li>블랙 보조 무기 상자 / 스페셜 소울 인챈터</li>
                <li>경험치 3배 쿠폰 (30분) - <span className="text-emerald-300">매주 7개 리필</span></li>
                <li>VIP 버프 (경험치/능력치)</li>
                <li>카르마 검은 환생의 불꽃 / 솔 에르다 조각</li>
                <li>메멘토 골드/실버 큐브 (200제) <span className="text-red-300">(챌린저스 전용)</span></li>
                <li>에픽/에디셔널 잠재능력 부여 스크롤 100%</li>
                <li>이노센트/순백의 주문서 100%</li>
                <li>카르마 스타포스 17성 강화권 (160제) <span className="text-red-300">(챌린저스 전용)</span></li>
              </ul>
            </div>
            
            <div className="bg-slate-950/60 border border-purple-800/30 rounded-xl p-4">
              <p className="font-bold text-purple-300 mb-2">💎 2. [스페셜 탭] 판매 물품 리스트</p>
              <p className="text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">사용 재화: 상급 챌린저스 코인 (하드 검마 급 이상 격파)</p>
              <ul className="space-y-1 list-disc list-inside text-xs">
                <li>솔 에르다 조각 (10개 묶음)</li>
                <li>카르마 심연의 환생의 불꽃</li>
                <li>솔 에르다</li>
                <li>카르마 블랙 큐브</li>
                <li>카르마 화이트 에디셔널 큐브</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-red-950/20 text-red-300 px-4 py-3 rounded-xl border border-red-900/50 text-xs sm:text-sm">
            <span className="font-bold">⚠️ 주의사항:</span> 일반 탭에서 판매하는 <strong>[메멘토 골드/실버 큐브, 카르마 브론즈 에디셔널 큐브, 카르마 스타포스 17성 강화권(160제)]</strong>는 챌린저스 월드 전용 아이템입니다. 인벤토리에 소지한 채로 본섭(일반 월드)으로 월드 리프가 불가능하니, 챌린저스 월드 내에서 스펙업용으로 모두 소모하셔야 합니다!
          </div>

          {/* 챌린저스 코인샵 이미지 */}
          <div className="w-full mt-5 border border-slate-700/50 rounded-xl overflow-hidden shadow-md bg-slate-950">
            <img
              src="/challengers-coinshop.png"
              alt="챌린저스 샵 물품 목록"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <Link 
              href="/calculator/challengers-season4"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 hover:from-emerald-500/35 hover:via-teal-500/35 hover:to-cyan-500/35 text-emerald-200 hover:text-white border border-emerald-500/30 hover:border-emerald-500/50 rounded-xl font-bold transition-all shadow-lg shadow-teal-950/40 text-sm md:text-base group"
            >
              <ShoppingCart className="w-4 h-4 text-emerald-400" /> 
              코인샵 미리 쇼핑하러 가기
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}
