'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, BookOpen, Shield, Sword, Coins, Zap, Target, Star } from 'lucide-react';
import UltimaSkillCalculator from '@/components/calculator/UltimaSkillCalculator';

export default function UltimaOperationGuidePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
        <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-indigo-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>블로그 홈으로</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* 타이틀 */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> 2026.06.18 ~ 09.16
            </span>
            <span className="px-3.5 py-1 text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full">🛡️ 여름 이벤트</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              울티마 작전일지 / 에테리온 아티팩트 <br />
              '보약 스킬' 총정리 및 공략
            </span>
          </h1>

          {/* 메인 이미지 */}
          <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-indigo-500/30 shadow-xl shadow-indigo-900/20">
            <Image 
              src="/images/ultima-hero.png" 
              alt="미션 울티마 및 에테리온 아티팩트 메인 화면" 
              width={1200}
              height={600}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>

          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-indigo-500 pl-5 py-2 bg-indigo-950/10 rounded-r-lg">
            이번 여름 메이플스토리를 뜨겁게 달굴 핵심 이벤트, <strong>'울티마 작전 일지(일명 보약 버프)'</strong>의 기본 정보와 보상, 스킬 강화 트리까지 한눈에 알아보기 쉽게 정리했습니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-indigo-500/30 transition-colors">
                <span className="text-blue-400 font-mono font-bold">01</span>
                <a href="#event-info" className="text-slate-300 hover:text-white transition-colors">이벤트 기본 정보 & 방어 임무</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-indigo-500/30 transition-colors">
                <span className="text-indigo-400 font-mono font-bold">02</span>
                <a href="#training-chips" className="text-slate-300 hover:text-white transition-colors">훈련 칩 획득 및 스킬 강화 비용</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-indigo-500/30 transition-colors">
                <span className="text-purple-400 font-mono font-bold">03</span>
                <a href="#combat-skills" className="text-slate-300 hover:text-white transition-colors">전투 훈련 스킬 (능력치 강화)</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-indigo-500/30 transition-colors">
                <span className="text-pink-400 font-mono font-bold">04</span>
                <a href="#special-skills" className="text-slate-300 hover:text-white transition-colors">특수 훈련 스킬 (컨텐츠 보상 강화)</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-indigo-500/50 hover:border-indigo-400 transition-colors">
                <span className="text-yellow-400 font-mono font-bold">05</span>
                <a href="#weekly-strategy" className="text-slate-200 font-bold hover:text-white transition-colors">주차별 훈련 일지 스킬 공략 (🔥 핵심)</a>
              </li>
            </ol>
          </div>
        </div>

        {/* 1. 이벤트 기본 정보 & 방어 임무 */}
        <section id="event-info" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 이벤트 기본 정보 및 방어 임무</h2>
          </div>

          {/* 방어 임무 이미지 */}
          <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-slate-700/50 shadow-lg shadow-slate-900/30">
            <Image 
              src="/images/ultima-mission.png" 
              alt="방어 임무 현황 화면" 
              width={1200}
              height={1200}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-blue-300 mb-2">기본 정보</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>참여 방법:</strong> 이벤트 시작 시 자동으로 '훈련 일지' 스킬 획득 (UI 확인 가능)</li>
                <li><strong>스킬 강화 기간:</strong> ~ 2026년 9월 16일(수) 오후 11시 59분까지</li>
                <li><strong>스킬 적용 기간:</strong> ~ 2026년 9월 23일(수) 오후 11시 59분까지</li>
              </ul>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-blue-300 mb-2">방어 임무 (주간 사냥)</h3>
              <p className="mb-3 text-slate-300">매주 레벨 범위 몬스터를 처치하여 <strong>연합 토큰</strong>과 <strong>훈련 칩</strong>을 획득하는 기본 임무입니다.</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>목표:</strong> 주간 몬스터 10,000마리 처치 (1만 마리 달성 시 한 번에 보상 수령 가능)</li>
                <li><strong>진행 횟수:</strong> 주당 최대 5회 / 이벤트 기간 내 <strong>총 60회</strong> 완료 가능 (계정 내 공유)</li>
                <li><strong>구간별 보상 (2,000마리 처치 시마다 누적):</strong>
                  <ul className="list-[circle] list-inside ml-6 mt-1 text-slate-400">
                    <li>연합 토큰 800개</li>
                    <li>전투 훈련 칩 5개</li>
                    <li>특수 훈련 칩 5개</li>
                  </ul>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-indigo-900/20 border border-indigo-800/30 rounded-lg">
                <p className="text-indigo-300 font-semibold text-sm">💡 방어 임무 패스 (후발대 구제)</p>
                <p className="text-slate-400 text-sm mt-1">지난주에 완료하지 못한 임무가 있다면 3,000 메이플포인트를 사용하여 1회 완료 처리할 수 있습니다.</p>
              </div>
            </div>

          </div>
        </section>

        {/* 2. 훈련 칩 획득 및 스킬 강화 비용 */}
        <section id="training-chips" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Coins className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 훈련 칩 획득 및 스킬 강화 비용</h2>
          </div>
          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            <p>획득한 훈련 칩을 소모하여 캐릭터의 스탯을 올리는 <strong>전투 훈련</strong>, 컨텐츠 보상을 늘리는 <strong>특수 훈련</strong>을 강화할 수 있습니다.</p>

            {/* 훈련 칩 UI 이미지 */}
            <div className="flex flex-col gap-2 my-6">
              <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-lg shadow-slate-900/30 bg-slate-800/50">
                <Image 
                  src="/images/ultima-training.png" 
                  alt="전투 및 특수 훈련 칩 화면" 
                  width={1200}
                  height={1200}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              
              <div className="relative w-full rounded-xl overflow-hidden border border-slate-700/50 shadow-lg shadow-slate-900/30 bg-slate-800/50">
                <Image 
                  src="/images/ultima-special-training.png" 
                  alt="특수 훈련 칩 화면" 
                  width={1200}
                  height={1200}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-indigo-300 mb-2">훈련 칩 메포 구매 (선택 사항)</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li><strong>비용:</strong> 개당 1,000 메이플포인트</li>
                <li>이벤트 시작 시 종류별 5개 구매 가능</li>
                <li>매주 목요일 오전 0시마다 구매 가능 한도 5개씩 누적 추가</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-300">
                    <th className="p-3 border border-slate-700 font-semibold rounded-tl-lg">레벨 달성</th>
                    <th className="p-3 border border-slate-700 font-semibold">1레벨</th>
                    <th className="p-3 border border-slate-700 font-semibold">2레벨</th>
                    <th className="p-3 border border-slate-700 font-semibold">3레벨</th>
                    <th className="p-3 border border-slate-700 font-semibold">4레벨</th>
                    <th className="p-3 border border-slate-700 font-semibold">5레벨</th>
                    <th className="p-3 border border-slate-700 font-semibold">6레벨</th>
                    <th className="p-3 border border-slate-700 font-bold text-indigo-300 rounded-tr-lg">총합 (1~6)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="bg-slate-900/30">
                    <td className="p-3 border border-slate-700 font-bold">소모 개수</td>
                    <td className="p-3 border border-slate-700">1개</td>
                    <td className="p-3 border border-slate-700">2개</td>
                    <td className="p-3 border border-slate-700">5개</td>
                    <td className="p-3 border border-slate-700">12개</td>
                    <td className="p-3 border border-slate-700">25개</td>
                    <td className="p-3 border border-slate-700">30개</td>
                    <td className="p-3 border border-slate-700 font-bold text-indigo-300">75개</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-5 sm:p-6 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-2 border-indigo-500/50 rounded-xl shadow-xl shadow-indigo-900/20">
              <p className="text-lg sm:text-xl font-black text-indigo-300 mb-4 flex items-center gap-2">
                💡 획득 가능한 총 훈련 칩 및 메포 소모량 계산
              </p>
              <ul className="list-disc list-inside space-y-2.5 text-slate-200 text-base sm:text-lg">
                <li><strong>무료 획득 (기본):</strong> 매주 5회 임무 완료 시 ➡ <strong>주당 전투 25개 / 특수 25개</strong></li>
                <li><strong>13주(전체 기간) 최대 무료 획득:</strong> <strong className="text-green-400">총 325개</strong> (전투/특수 각각)</li>
                
                <div className="h-px w-full bg-indigo-500/30 my-4"></div>
                
                <li><strong>유료 구매 한도 (선택):</strong> 시작 시 5개부터 매주 5개씩 한도 누적 ➡ <strong>13주차 누적 최대 65개 구매 가능</strong> (전투/특수 각각)</li>
                <li><strong>전체 기간 유료 풀 매수 개수:</strong> 전투 65개 + 특수 65개 = <strong>총 130개</strong></li>
                
                <div className="bg-indigo-950/50 border border-indigo-500/30 p-3 sm:p-4 rounded-lg mt-3 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm sm:text-base border-b border-indigo-500/20 pb-2">
                    <span className="text-indigo-300">⚔️ 전투 훈련 칩 풀매수 (65개)</span>
                    <strong className="text-indigo-100">65,000 메포</strong>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base border-b border-indigo-500/20 pb-2">
                    <span className="text-indigo-300">🌟 특수 훈련 칩 풀매수 (65개)</span>
                    <strong className="text-indigo-100">65,000 메포</strong>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-indigo-200 text-sm sm:text-base font-bold">13주 전체 풀매수 총합</span>
                    <strong className="text-yellow-400 text-lg sm:text-xl font-black tracking-tight">130,000 메이플포인트</strong>
                  </div>
                </div>
              </ul>
            </div>

          </div>
        </section>

        {/* 3. 전투 훈련 스킬 (능력치 강화) */}
        <section id="combat-skills" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Sword className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 전투 훈련 스킬 (능력치 강화)</h2>
          </div>
          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            <p>보스전과 사냥을 압도적으로 유리하게 이끌어 줄 <strong>전투 능력치 보약 버프</strong>입니다.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-purple-900/20 text-purple-200">
                    <th className="p-3 border border-purple-800/30 font-semibold rounded-tl-lg">종류</th>
                    <th className="p-3 border border-purple-800/30 font-semibold">1레벨</th>
                    <th className="p-3 border border-purple-800/30 font-semibold">2레벨</th>
                    <th className="p-3 border border-purple-800/30 font-semibold">3레벨</th>
                    <th className="p-3 border border-purple-800/30 font-semibold">4레벨</th>
                    <th className="p-3 border border-purple-800/30 font-semibold">5레벨</th>
                    <th className="p-3 border border-purple-800/30 font-bold text-purple-300 rounded-tr-lg">6레벨 (M)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">공격력 / 마력</td>
                    <td className="p-3 border border-slate-700">+5</td>
                    <td className="p-3 border border-slate-700">+10</td>
                    <td className="p-3 border border-slate-700">+15</td>
                    <td className="p-3 border border-slate-700">+20</td>
                    <td className="p-3 border border-slate-700">+30</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+40</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">보스 몬스터 데미지</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+15%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+30%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+40%</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">방어율 무시</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+15%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+30%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+40%</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">일반 몬스터 데미지</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+15%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+30%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+40%</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">올스탯</td>
                    <td className="p-3 border border-slate-700">+10</td>
                    <td className="p-3 border border-slate-700">+20</td>
                    <td className="p-3 border border-slate-700">+30</td>
                    <td className="p-3 border border-slate-700">+40</td>
                    <td className="p-3 border border-slate-700">+60</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+80</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">최대 HP / MP</td>
                    <td className="p-3 border border-slate-700">+500</td>
                    <td className="p-3 border border-slate-700">+1000</td>
                    <td className="p-3 border border-slate-700">+1500</td>
                    <td className="p-3 border border-slate-700">+2000</td>
                    <td className="p-3 border border-slate-700">+3000</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+4000</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">버프 지속시간</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+15%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+25%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+30%</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">크리티컬 확률</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+15%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+25%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+30%</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">아케인포스</td>
                    <td className="p-3 border border-slate-700">+10</td>
                    <td className="p-3 border border-slate-700">+20</td>
                    <td className="p-3 border border-slate-700">+30</td>
                    <td className="p-3 border border-slate-700">+40</td>
                    <td className="p-3 border border-slate-700">+50</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+60</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">어센틱포스</td>
                    <td className="p-3 border border-slate-700">+10</td>
                    <td className="p-3 border border-slate-700">+20</td>
                    <td className="p-3 border border-slate-700">+30</td>
                    <td className="p-3 border border-slate-700">+40</td>
                    <td className="p-3 border border-slate-700">+50</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+60</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">사냥 경험치 획득량</td>
                    <td className="p-3 border border-slate-700">+2.5%</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+7.5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+12.5%</td>
                    <td className="p-3 border border-slate-700 font-bold text-purple-300">+15%</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* 4. 특수 훈련 스킬 (컨텐츠 보상 강화) */}
        <section id="special-skills" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. 특수 훈련 스킬 (컨텐츠 보상 강화)</h2>
          </div>
          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            <p>매일, 매주 숙제처럼 하는 컨텐츠들의 <strong>보상을 극대화</strong>시켜주는 엄청난 스킬들입니다.</p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse min-w-[600px] text-sm">
                <thead>
                  <tr className="bg-pink-900/20 text-pink-200">
                    <th className="p-3 border border-pink-800/30 font-semibold rounded-tl-lg">종류</th>
                    <th className="p-3 border border-pink-800/30 font-semibold">1레벨</th>
                    <th className="p-3 border border-pink-800/30 font-semibold">2레벨</th>
                    <th className="p-3 border border-pink-800/30 font-semibold">3레벨</th>
                    <th className="p-3 border border-pink-800/30 font-semibold">4레벨</th>
                    <th className="p-3 border border-pink-800/30 font-semibold">5레벨</th>
                    <th className="p-3 border border-pink-800/30 font-bold text-pink-300 rounded-tr-lg">6레벨 (M)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">보스 처치 시 솔 에르다 기운</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+40%</td>
                    <td className="p-3 border border-slate-700">+60%</td>
                    <td className="p-3 border border-slate-700">+80%</td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300">+100%</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">몬스터 컬렉션 등록 확률</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+40%</td>
                    <td className="p-3 border border-slate-700">+60%</td>
                    <td className="p-3 border border-slate-700">+80%</td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300">+100%</td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">몬스터 파크 클리어 경험치</td>
                    <td className="p-3 border border-slate-700">+5%</td>
                    <td className="p-3 border border-slate-700">+10%</td>
                    <td className="p-3 border border-slate-700">+20%</td>
                    <td className="p-3 border border-slate-700">+30%</td>
                    <td className="p-3 border border-slate-700">+40%</td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300">+50%</td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">아케인리버 일일 퀘스트 보상</td>
                    <td className="p-3 border border-slate-700 text-xs">+5%<br/><span className="text-pink-400 mt-1 inline-block">+2개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+10%<br/><span className="text-pink-400 mt-1 inline-block">+4개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+20%<br/><span className="text-pink-400 mt-1 inline-block">+8개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+30%<br/><span className="text-pink-400 mt-1 inline-block">+12개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+40%<br/><span className="text-pink-400 mt-1 inline-block">+16개</span></td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300 text-xs">+50%<br/><span className="mt-1 inline-block">+20개</span></td>
                  </tr>
                  <tr className="bg-slate-900/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">그란디스 일일 퀘스트 보상</td>
                    <td className="p-3 border border-slate-700 text-xs">+5%<br/><span className="text-pink-400 mt-1 inline-block">+2개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+10%<br/><span className="text-pink-400 mt-1 inline-block">+3개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+20%<br/><span className="text-pink-400 mt-1 inline-block">+4개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+30%<br/><span className="text-pink-400 mt-1 inline-block">+5개</span></td>
                    <td className="p-3 border border-slate-700 text-xs">+40%<br/><span className="text-pink-400 mt-1 inline-block">+7개</span></td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300 text-xs">+50%<br/><span className="mt-1 inline-block">+9개</span></td>
                  </tr>
                  <tr className="bg-slate-950/30 hover:bg-slate-800/50 transition-colors">
                    <td className="p-3 border border-slate-700 font-bold">유니온 주간 미션 코인</td>
                    <td className="p-3 border border-slate-700">+100</td>
                    <td className="p-3 border border-slate-700">+150</td>
                    <td className="p-3 border border-slate-700">+200</td>
                    <td className="p-3 border border-slate-700">+250</td>
                    <td className="p-3 border border-slate-700">+300</td>
                    <td className="p-3 border border-slate-700 font-bold text-pink-300">+400</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-pink-900/20 border border-pink-800/40 rounded-xl mt-4">
              <p className="text-pink-300 font-medium">⚠️ 특수 훈련 참고 사항</p>
              <ul className="list-disc list-inside mt-2 text-slate-300 space-y-1">
                <li>몬스터파크 클리어 경험치 증가는 <strong>'익스트림 몬스터파크' 완료 시에도 적용</strong>됩니다.</li>
                <li>단, <strong>'몬스터파크 핸즈'</strong>에서는 해당 경험치 증가 효과를 받을 수 없습니다.</li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. 주차별 공략 (placeholder) */}
        <section id="weekly-strategy" className="mb-14 scroll-mt-24 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-[0_0_30px_rgba(99,102,241,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Star className="w-32 h-32 text-indigo-400" />
          </div>
          <div className="flex items-center gap-3 mb-6 border-b border-indigo-500/30 pb-4 relative z-10">
            <Target className="w-7 h-7 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-white drop-shadow-md">5. 🔥 주차별 훈련 일지 스킬 마스터 공략</h2>
          </div>
          <div className="relative z-10">
            <UltimaSkillCalculator />
          </div>
        </section>

        {/* 6. 에테리온 아티팩트 공략 */}
        <section id="aetherion-artifact" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. 🔥 [추가 보약] 에테리온 아티팩트 핵심 공략</h2>
          </div>

          {/* 에테리온 아티팩트 UI 이미지 */}
          <div className="relative w-full rounded-xl overflow-hidden mb-8 border border-yellow-500/30 shadow-lg shadow-yellow-900/20">
            <Image 
              src="/images/aetherion-artifact.png" 
              alt="에테리온 아티팩트 화면" 
              width={1200}
              height={1200}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          <div className="space-y-8 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            
            {/* 1. 에테리온 아티팩트란? */}
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3 border-l-4 border-yellow-400 pl-3">1. 에테리온 아티팩트란? (기본 개념)</h3>
              <p className="mb-2"><strong>'에테리온 아티팩트'</strong>는 미션 울티마(기본 보약)와 <strong>동시에 진행되는 추가 보약 이벤트</strong>입니다. 기본 보약이 캐릭터의 '전투 스탯'을 올려준다면, 아티팩트는 <strong>'경험치 획득량'과 '솔 에르다 획득량' 등 성장에 직결되는 엄청난 혜택</strong>을 제공합니다.</p>
              <div className="bg-slate-900/50 p-4 sm:p-5 rounded-lg border border-slate-700/50 mt-3">
                <p className="font-bold text-slate-100 mb-3">📌 꼭 알아야 할 3가지 핵심 용어</p>
                <ul className="list-disc list-inside space-y-3 text-slate-300">
                  <li className="bg-yellow-900/20 p-2 rounded border border-yellow-500/30 -ml-2 pl-4"><strong className="text-yellow-300">주간 에너지 수집:</strong> 매주 레벨 범위 <strong className="text-yellow-300 underline underline-offset-4 decoration-yellow-500/50">몬스터 1만 마리를 잡는 기본 숙제</strong>입니다. <span className="text-green-400 font-bold">(매주 1회씩 한도 추가)</span></li>
                  <li><strong>코어 개방:</strong> 주간 미션을 완료할 때마다 내가 원하는 혜택(코어)을 하나씩 잠금 해제할 수 있습니다.</li>
                  <li><strong>에테리온 (강화 재료):</strong> 잠금 해제한 코어의 레벨을 올리는 데 사용하는 전용 재료입니다. 사냥 및 주간 보스에서 드롭됩니다.</li>
                </ul>
              </div>
            </div>

            {/* 2. 에테리온(강화 재료) 파밍과 거래 (핵심) */}
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3 border-l-4 border-yellow-400 pl-3">2. 에테리온 파밍과 경매장 거래 (무자본 필수 시청!)</h3>
              <p className="mb-2">이번 이벤트의 가장 큰 특징은 바로 코어 강화 재료인 <strong>'에테리온'이 경매장 거래가 가능하다는 점</strong>입니다. (1회 한정)</p>
              
              {/* 에테리온 종류 이미지 */}
              <div className="relative w-full rounded-xl overflow-hidden my-4 border border-slate-700/50 shadow-lg shadow-slate-900/30">
                <Image 
                  src="/images/aetherion-types.png" 
                  alt="3가지 종류의 에테리온 아이템" 
                  width={1200}
                  height={1200}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

              <div className="overflow-x-auto my-4">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-300">
                      <th className="p-3 border border-slate-700 font-semibold rounded-tl-lg">종류</th>
                      <th className="p-3 border border-slate-700 font-semibold">주요 획득처</th>
                      <th className="p-3 border border-slate-700 font-semibold rounded-tr-lg">적립량 (사용 시)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">보급형 에테리온</td>
                      <td className="p-3 border border-slate-700 text-slate-400">사냥, 주간 보스</td>
                      <td className="p-3 border border-slate-700 text-blue-300">+1개</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">활성형 에테리온</td>
                      <td className="p-3 border border-slate-700 text-slate-400">사냥, 주간 보스</td>
                      <td className="p-3 border border-slate-700 text-indigo-300">+10개</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">증폭형 에테리온</td>
                      <td className="p-3 border border-slate-700 text-slate-400">주간 보스 전용</td>
                      <td className="p-3 border border-slate-700 text-purple-300 font-bold">+100개</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="list-disc list-inside space-y-1 text-pink-300 font-medium bg-pink-950/10 p-3 rounded-lg border border-pink-900/30">
                <li><strong>무자본 유저:</strong> 사냥과 보스돌이로 얻은 에테리온을 모두 경매장에 팔아 메소를 벌 수 있습니다.</li>
                <li><strong>고자본 유저:</strong> 부캐릭을 동원하거나 경매장에서 에테리온을 구매하여 코어를 초고속으로 만렙(5렙) 찍을 수 있습니다.</li>
              </ul>
            </div>

            {/* 3. 코어 레벨업 확률과 비용 */}
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3 border-l-4 border-yellow-400 pl-3">3. 코어 강화 확률 및 비용</h3>
              <p className="mb-2">코어는 모은 에테리온을 소모해 확률적으로 레벨업합니다. <strong>실패하더라도 레벨이 떨어지지 않으며 재료만 소모되니 안심하세요.</strong></p>
              <div className="overflow-x-auto my-3">
                <table className="w-full text-center border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-300">
                      <th className="p-3 border border-slate-700 font-semibold rounded-tl-lg text-left">강화 단계</th>
                      <th className="p-3 border border-slate-700 font-semibold">1 → 2레벨</th>
                      <th className="p-3 border border-slate-700 font-semibold">2 → 3레벨</th>
                      <th className="p-3 border border-slate-700 font-semibold">3 → 4레벨</th>
                      <th className="p-3 border border-slate-700 font-semibold rounded-tr-lg">4 → 5레벨 (만렙)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 font-bold text-slate-200 text-left">소모 에테리온</td>
                      <td className="p-3 border border-slate-700">10개</td>
                      <td className="p-3 border border-slate-700">30개</td>
                      <td className="p-3 border border-slate-700">50개</td>
                      <td className="p-3 border border-slate-700 text-pink-300">100개</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 font-bold text-slate-200 text-left">성공 확률</td>
                      <td className="p-3 border border-slate-700 text-green-400">90%</td>
                      <td className="p-3 border border-slate-700 text-blue-400">50%</td>
                      <td className="p-3 border border-slate-700 text-yellow-400">20%</td>
                      <td className="p-3 border border-slate-700 text-red-400 font-bold">15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. 코어 혜택 총정리 및 추천 순서 */}
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3 border-l-4 border-yellow-400 pl-3">4. 주차별 개방 혜택 및 날짜 (코어 & 아티팩트)</h3>
              <p className="mb-3 text-slate-300">매주 목요일 자정마다 주간 미션 한도가 풀리며, 완료 누적 횟수에 따라 정해진 순서대로 <span className="text-pink-300 font-bold">'아티팩트 기본 효과'</span>가 열리고, 짝수 회차(1, 2, 4, 6, 8, 10회)마다 <span className="text-yellow-300 font-bold">'원하는 코어'</span>를 하나씩 잠금 해제할 수 있습니다.</p>
              
              <div className="overflow-x-auto my-4">
                <table className="w-full text-center border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-300">
                      <th className="p-3 border border-slate-700 font-semibold rounded-tl-lg">누적 횟수</th>
                      <th className="p-3 border border-slate-700 font-semibold">해금 날짜</th>
                      <th className="p-3 border border-slate-700 font-semibold text-yellow-300">코어 선택 개방 (레벨업 가능)</th>
                      <th className="p-3 border border-slate-700 font-semibold text-pink-300 rounded-tr-lg">아티팩트 자동 활성화 (기본 혜택)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">1회차 (1주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">6월 18일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">코어 1개 선택 가능</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">일일 퀘스트 보상 (심볼 추가 지급)</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">2회차 (2주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">6월 25일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">코어 1개 선택 가능</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">3회차 (3주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">7월 2일 (목)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">몬스터파크 클리어 경험치</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">4회차 (4주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">7월 9일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">코어 1개 선택 가능</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">5회차 (5주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">7월 16일 (목)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">사냥 시 솔 에르다 획득량</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">6회차 (6주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">7월 23일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">코어 1개 선택 가능</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">7회차 (7주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">7월 30일 (목)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">보스 처치 시 솔 에르다 획득량</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">8회차 (8주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">8월 6일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">코어 1개 선택 가능</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">9회차 (9주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">8월 13일 (목)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">에픽 던전 기본 경험치 보상</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">10회차 (10주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">8월 20일 (목)</td>
                      <td className="p-3 border border-slate-700 text-yellow-100 font-bold">마지막 코어 선택 (총 6개)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                    </tr>
                    <tr className="bg-slate-900/30">
                      <td className="p-3 border border-slate-700 text-slate-200">11회차 (11주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">8월 27일 (목)</td>
                      <td className="p-3 border border-slate-700 text-slate-500">-</td>
                      <td className="p-3 border border-slate-700 text-pink-200 font-bold">트레져 헌터 경험치 획득량</td>
                    </tr>
                    <tr className="bg-slate-950/30">
                      <td className="p-3 border border-slate-700 text-slate-200">12회차 (12주차)</td>
                      <td className="p-3 border border-slate-700 text-cyan-300">9월 3일 (목)</td>
                      <td colSpan={2} className="p-3 border border-slate-700 text-yellow-300 font-bold bg-yellow-900/20">에테리온 100개 지급 (주간 미션 최종 보상)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <div className="bg-pink-900/20 border border-pink-500/30 p-4 rounded-lg text-sm text-pink-200 break-keep">
                  <strong className="text-pink-300 block mb-1">🔥 무소과금/가성비 유저 필수 꿀팁!</strong>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>코어 개방 및 강화(레벨업)는 <strong>'아티팩트 기본 활성화'가 열리기 전이라도 <span className="text-yellow-300">'코어 선택 개방'</span>으로 강화(레벨업)를 진행할 수 있습니다.</strong></li>
                    <li>단, 무작정 하나의 코어를 5레벨(15% 확률)까지 무리해서 달리기보다는, <strong className="text-yellow-300">성공 확률이 높은 2레벨(90%)이나 3레벨(50%)까지 여러 코어를 골고루 강화하는 것이 에테리온 소모량을 획기적으로 줄이는 가성비 강화</strong>입니다.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* 5. 아티팩트의 힘 (코어 레벨별 상세 수치) */}
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3 border-l-4 border-yellow-400 pl-3">5. 아티팩트의 힘 (코어 레벨별 상세 수치 및 유의사항)</h3>
              <p className="mb-3 text-slate-300">최종 혜택은 <strong>'아티팩트 기본 활성화 수치'</strong>와 <strong>'코어 레벨 수치'</strong>가 합산되어 적용됩니다.</p>
              
              <div className="overflow-x-auto my-4">
                <table className="w-full text-center border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-800/50 text-slate-300 text-sm">
                      <th className="p-3 border border-slate-700 font-semibold rounded-tl-lg">혜택 종류</th>
                      <th className="p-3 border border-slate-700 font-semibold text-pink-300">아티팩트<br/>기본 활성화</th>
                      <th className="p-3 border border-slate-700 font-semibold">코어 1Lv</th>
                      <th className="p-3 border border-slate-700 font-semibold">코어 2Lv</th>
                      <th className="p-3 border border-slate-700 font-semibold">코어 3Lv</th>
                      <th className="p-3 border border-slate-700 font-semibold">코어 4Lv</th>
                      <th className="p-3 border border-slate-700 font-semibold text-yellow-300">코어 5Lv</th>
                      <th className="p-3 border border-slate-700 font-semibold text-green-400 rounded-tr-lg">최대 합계<br/>(만렙 시)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">일일 퀘스트 보상 (경험치)</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+20%</td>
                      <td className="p-3 border border-slate-700">+1%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+3%</td>
                      <td className="p-3 border border-slate-700">+4%</td>
                      <td className="p-3 border border-slate-700">+6%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+26%</td>
                    </tr>
                    <tr className="bg-slate-950/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">몬스터파크 클리어 경험치</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+30%</td>
                      <td className="p-3 border border-slate-700">+1%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+3%</td>
                      <td className="p-3 border border-slate-700">+4%</td>
                      <td className="p-3 border border-slate-700">+6%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+36%</td>
                    </tr>
                    <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">사냥 시 솔 에르다 획득량</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+100%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+5%</td>
                      <td className="p-3 border border-slate-700">+10%</td>
                      <td className="p-3 border border-slate-700">+15%</td>
                      <td className="p-3 border border-slate-700">+20%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+120%</td>
                    </tr>
                    <tr className="bg-slate-950/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">보스 처치 시 솔 에르다 획득량</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+40%</td>
                      <td className="p-3 border border-slate-700">+1%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+4%</td>
                      <td className="p-3 border border-slate-700">+6%</td>
                      <td className="p-3 border border-slate-700">+8%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+48%</td>
                    </tr>
                    <tr className="bg-slate-900/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">에픽 던전 기본 경험치 보상</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+150%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+5%</td>
                      <td className="p-3 border border-slate-700">+10%</td>
                      <td className="p-3 border border-slate-700">+20%</td>
                      <td className="p-3 border border-slate-700">+30%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+180%</td>
                    </tr>
                    <tr className="bg-slate-950/30 hover:bg-slate-800/50">
                      <td className="p-3 border border-slate-700 text-slate-200 font-bold text-left">트레져 헌터 경험치 획득량</td>
                      <td className="p-3 border border-slate-700 text-pink-200">+100%</td>
                      <td className="p-3 border border-slate-700">+2%</td>
                      <td className="p-3 border border-slate-700">+5%</td>
                      <td className="p-3 border border-slate-700">+10%</td>
                      <td className="p-3 border border-slate-700">+15%</td>
                      <td className="p-3 border border-slate-700">+20%</td>
                      <td className="p-3 border border-slate-700 text-green-400 font-bold">+120%</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 유의사항 */}
              <div className="p-4 sm:p-5 bg-slate-950/60 border border-slate-800 rounded-xl mt-4">
                <h4 className="text-pink-300 font-bold mb-3">⚠️ 꼭 알아두어야 할 핵심 유의사항</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                  <li><strong className="text-slate-200">심볼 추가 지급:</strong> 일퀘 아티팩트 개방 시 <span className="text-yellow-300">매일 아케인심볼 4개, 어센틱심볼 3개가 지역별로 하루 한 번</span> 추가 지급됩니다. 코어 레벨업은 경험치 획득량만 늘려주며 심볼 갯수는 더 증가하지 않습니다.</li>
                  <li><strong className="text-slate-200">일퀘 경험치 혜택 주의:</strong> 일퀘 보상 경험치 증가 효과는 <span className="text-yellow-300">각 지역별로 월드당 하루 1번</span>만 적용됩니다. 스킬을 활성화하기 전에 이미 완료해버린 일퀘는 소급해서 혜택을 받을 수 없으니 꼭 스킬 개방 후 일퀘를 미세요!</li>
                  <li><strong className="text-slate-200">테네브리스 유의:</strong> 테네브리스 지역(문브릿지/고통의미궁/리멘)은 일퀘 보상으로 심볼이 없으므로 경험치 증가만 적용됩니다.</li>
                  <li><strong className="text-slate-200">익몬 적용 O / 몬파 핸즈 X:</strong> 몬스터파크 경험치 혜택은 익스트림 몬스터파크에도 동일하게 뻥튀기 적용되나, 메이플 핸즈 앱으로 완료하는 경우에는 경험치 증가 효과를 받을 수 없습니다.</li>
                  <li><strong className="text-slate-200">솔 에르다 혜택 조건:</strong> 솔 에르다 획득량 증가는 260레벨 이상 6차 전직을 완료한 캐릭터만 누릴 수 있으며, 보스 처치 솔 에르다는 스우(하드) 이상 클리어 후 생존한 상태에서 보상 맵 상자를 부숴야만 드롭됩니다. (보유 한도 도달 시 드롭 불가)</li>
                </ul>
              </div>
            </div>
            
            {/* 6. 최종 보상 */}
            <div className="p-5 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/40 rounded-xl mt-6">
              <div className="flex items-start sm:items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-full shrink-0">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <p className="text-indigo-200 font-bold text-lg mb-1">6. 최종 만렙(30레벨) 달성 보상</p>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">이벤트가 끝날 때까지 천천히 6개의 코어를 모두 5레벨까지 강화하여 <strong>총합 30레벨</strong>을 달성하면, 이벤트 한정 영구 훈장인 <strong>'에테리온 오버로드'</strong>를 획득할 수 있습니다!</p>
                </div>
              </div>
              
              {/* 에테리온 오버로드 훈장 및 착용샷 이미지 */}
              <div className="relative w-full sm:w-3/4 max-w-2xl rounded-xl overflow-hidden border border-indigo-500/30 shadow-lg shadow-indigo-900/40 mt-4 mx-auto">
                <Image 
                  src="/images/aetherion-overlord.png" 
                  alt="에테리온 오버로드 훈장 착용샷" 
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mt-8 mb-6 px-2">
          {['#메이플스토리', '#여름이벤트', '#울티마작전일지', '#보약스킬', '#마약버프', '#훈련일지', '#메이플이벤트'].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-800/40 text-slate-300 text-sm rounded-full border border-slate-700/50 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* 블로그 목록으로 돌아가기 버튼 */}
        <div className="flex justify-center mt-12 border-t border-slate-800/60 pt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/50 hover:border-indigo-500/50 transition-all font-semibold shadow-lg">
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
