'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, Info, Zap, ShieldAlert, Sparkles, Target, Coins } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function MiracleTimeGuidePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-white pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-700 mx-auto">
        <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-amber-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>블로그 홈으로</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* 타이틀 */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> 2026년 6월 27일
            </span>
            <span className="px-3.5 py-1 text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">💎 미라클 타임</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
              미라클 타임 완벽 공략 : "레전드리의 함정"을 피하는 스펙업 가이드
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-100 mb-8 leading-relaxed break-keep border-l-4 border-amber-500 pl-5 py-3 bg-amber-900/20 rounded-r-lg">
            메이플스토리 스펙업의 핵심 이벤트, '미라클 타임'이 다가왔습니다. 잠재능력 등급 상승 확률이 2배가 되는 엄청난 기회지만, 자칫 잘못된 도파민에 휘둘리면 막대한 메소를 탕진하고 오히려 스펙이 떨어지는 대참사를 겪을 수 있습니다.
            <br/><br/>
            수많은 기댓값과 데이터를 분석해 본 결과, 이번 미라클 타임의 가장 완벽한 승리 공식은 단 하나로 수렴합니다. 성공적인 스펙업을 위해 반드시 알아야 할 <span className="text-amber-300 font-bold">"레전드리 직작을 피해야 하는 이유"</span>부터 부위별 최적화 가이드까지 완벽하게 총정리해 드립니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-800/60 border border-slate-600 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#rule1', '01', '제1원칙 : "레전드리의 함정"을 피하라', 'text-amber-400'],
                ['#guide', '02', '부위별 스펙업 가이드 및 행동 지침', 'text-emerald-400'],
                ['#expected', '03', '본섭 기댓값 & 소모 메소 데이터', 'text-purple-400'],
                ['#exceptions', '04', '예외 : 레전드리는 도대체 언제 노리나요?', 'text-rose-400'],
                ['#commandments', '05', '자본을 지키는 미라클 데이 3계명', 'text-cyan-400'],
              ].map(([href, num, label, color]) => (
                <li key={num} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-colors">
                  <span className={`${color} font-mono font-bold`}>{num}</span>
                  <a href={href as string} className="text-slate-100 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 1. 제1원칙 */}
        <section id="rule1" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">1. 제1원칙 : "레전드리의 함정"을 피하고 유니크/에픽에서 멈춰라!</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-100 leading-relaxed break-keep">
            <p className="text-slate-100">
              모든 공략에서 고자본, 저자본 할 것 없이 입을 모아 강조하는 절대 불변의 법칙입니다. 미라클 타임의 목표는 무조건 <span className="text-purple-300 font-bold px-2 py-0.5 bg-purple-900/40 rounded border border-purple-500/40">윗잠 유니크 + 에디셔널 에픽</span>입니다. 직접 레전드리 등급업을 노리는 것이 최악의 선택인 3가지 결정적 이유를 알려드립니다.
            </p>

            <div className="grid gap-4">
              <div className="bg-red-950/40 border border-red-700/50 rounded-xl p-5 hover:border-red-500/60 transition-colors">
                <h3 className="font-bold text-red-300 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> 천장과 기댓값의 압박</h3>
                <p className="text-slate-200 text-sm">미라클 타임 혜택으로 확률이 2배가 되더라도, 레전드리를 가기 위한 기본 기댓값 자체는 유니크와 비교도 안 되게 높습니다. 운이 나빠 '천장'을 치게 되면 수십억 메소 단위가 허공으로 증발합니다.</p>
              </div>
              
              <div className="bg-orange-950/40 border border-orange-700/50 rounded-xl p-5 hover:border-orange-500/60 transition-colors">
                <h3 className="font-bold text-orange-300 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> 옵션 뽑기라는 진짜 지옥</h3>
                <p className="text-slate-200 text-sm">기적적으로 레전드리를 띄웠다고 끝이 아닙니다. 미라클 타임은 '등급업' 확률만 2배일 뿐, 유효 3줄 옵션을 띄우는 확률은 평소와 똑같습니다. 기껏 레전드리를 달아놓고 옵션이 망해서 기존 유니크보다 스펙이 떨어지는 경우가 부지기수입니다.</p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-5 hover:border-emerald-500/60 transition-colors">
                <h3 className="font-bold text-emerald-300 mb-2 flex items-center gap-2"><Coins className="w-4 h-4" /> 경매장 폭락의 법칙</h3>
                <p className="text-slate-200 text-sm">미라클 타임 당일에는 수많은 고자본 유저들이 아이템을 쏟아냅니다. 이로 인해 레전드리 완성품 매물의 가격이 평소보다 훨씬 저렴해집니다. 직접 지옥을 맛보는 것보다, 메소를 쥐고 있다가 남이 예쁘게 완성해 둔 레전드리 템을 사는 것이 압도적인 이득입니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 부위별 스펙업 가이드 */}
        <section id="guide" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Target className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">2. 부위별 스펙업 가이드 및 행동 지침</h2>
          </div>

          <div className="space-y-4">
            <p className="text-slate-100 text-sm mb-2">데이터에 기반하여 가장 가성비가 높은 부위별 세팅 목표를 정리했습니다.</p>
            
            <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80 shadow-lg">
              <table className="w-full text-sm text-left min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-slate-800 border-b border-slate-600 text-slate-100">
                    <th className="px-4 py-3 font-bold w-1/4">장비 부위</th>
                    <th className="px-4 py-3 font-bold w-1/4 text-center">추천 등급업 목표</th>
                    <th className="px-4 py-3 font-bold w-1/2">핵심 행동 지침</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-slate-100">
                  <tr className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">주력 장신구/방어구</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-purple-300 font-bold bg-purple-900/40 px-2 py-1 rounded">윗잠 유니크</span><br/>
                      <span className="text-blue-300 text-xs bg-blue-900/40 px-2 py-0.5 rounded mt-1 inline-block">에디 에픽</span>
                    </td>
                    <td className="px-4 py-3 text-slate-200 text-sm">직접 메소를 돌려 등급업 진행. 가장 효율이 높은 스펙업 구간입니다.</td>
                  </tr>
                  <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">토드 가능 장신구</td>
                    <td className="px-4 py-3 text-center font-bold text-amber-300">토드 매물 활용</td>
                    <td className="px-4 py-3 text-slate-200 text-sm">에디 에픽 매물이 2억~2.5억 이하라면 직접 띄우지 말고 무조건 토드하세요.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">교환 불가 WSE<br/><span className="text-xs text-slate-400">(엠블렘 등)</span></td>
                    <td className="px-4 py-3 text-center font-bold text-purple-300">유니크 2줄 스톱</td>
                    <td className="px-4 py-3 text-slate-200 text-sm">교환 불가 장비의 레전드리 직작은 기댓값 회수가 불가능하므로 <span className="text-red-400 font-bold">강력히 비추천</span>합니다.</td>
                  </tr>
                  <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">교환 가능 보조무기</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-300">완성품 구매</td>
                    <td className="px-4 py-3 text-slate-200 text-sm">직접 돌리지 마세요. 당일 경매장에서 가격이 폭락한 레전드리 매물을 줍는 것이 이득입니다.</td>
                  </tr>
                  <tr className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">드메템 (드랍/메소)</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-300">완성품 구매</td>
                    <td className="px-4 py-3 text-slate-200 text-sm">나만 만들어서 팔 생각하는 게 아닙니다. 시세가 낮아지므로 장사 목적의 직작은 피하세요.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 3. 본섭 기댓값 데이터 */}
        <section id="expected" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Coins className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">3. 본섭 기댓값 & 소모 메소 데이터</h2>
          </div>

          <div className="space-y-10 text-sm">
            {/* 윗잠 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                🟢 윗잠 (잠재능력) 본섭 기댓값
              </h3>

              {[
                {
                  label: '레어 → 에픽', color: 'text-emerald-400', warn: false,
                  rows: [
                    ['~159', '4,000,000', '6', '24,000,000', '4', '16,000,000', '10', '40,000,000'],
                    ['~199', '4,250,000', '6', '25,500,000', '4', '17,000,000', '10', '42,500,000'],
                    ['~249', '4,500,000', '6', '27,000,000', '4', '18,000,000', '10', '45,000,000'],
                    ['250~', '5,000,000', '6', '30,000,000', '4', '20,000,000', '10', '50,000,000'],
                  ],
                },
                {
                  label: '에픽 → 유니크', color: 'text-purple-400', warn: false,
                  rows: [
                    ['~159', '16,000,000', '23', '368,000,000', '14', '224,000,000', '42', '672,000,000'],
                    ['~199', '17,000,000', '23', '391,000,000', '14', '238,000,000', '42', '714,000,000'],
                    ['~249', '18,000,000', '23', '414,000,000', '14', '252,000,000', '42', '756,000,000'],
                    ['250~', '20,000,000', '23', '460,000,000', '14', '280,000,000', '42', '840,000,000'],
                  ],
                },
                {
                  label: '유니크 → 레전드리', color: 'text-yellow-400', warn: '⚠️ 천장 소모 메소가 최대 45억까지! 직작을 피해야 하는 이유입니다.',
                  rows: [
                    ['~159', '34,000,000', '56', '1,904,000,000', '35', '1,190,000,000', '107', '3,638,000,000'],
                    ['~199', '36,125,000', '56', '2,023,000,000', '35', '1,264,375,000', '107', '3,865,375,000'],
                    ['~249', '38,250,000', '56', '2,142,000,000', '35', '1,338,750,000', '107', '4,092,750,000'],
                    ['250~', '42,500,000', '56', '2,380,000,000', '35', '1,487,500,000', '107', '4,547,500,000'],
                  ],
                },
              ].map(({ label, color, warn, rows }) => (
                <div key={label} className="mb-6">
                  <p className={`font-bold ${color} mb-2 flex items-center gap-2`}>▸ {label}</p>
                  <div className={`overflow-x-auto rounded-xl border ${warn ? 'border-yellow-700/50' : 'border-slate-600'} bg-slate-900/80`}>
                    <table className="w-full text-xs text-left min-w-[700px] border-collapse">
                      <thead>
                        <tr className={`${warn ? 'bg-slate-800 border-b border-yellow-700/40' : 'bg-slate-800 border-b border-slate-600'} text-slate-100`}>
                          <th className="px-3 py-2.5 font-bold">아이템 레벨</th>
                          <th className="px-3 py-2.5 font-bold">1회 재설정</th>
                          <th className="px-3 py-2.5 font-bold text-slate-300">일반 기댓값</th>
                          <th className="px-3 py-2.5 font-bold text-slate-300">일반 소모 메소</th>
                          <th className="px-3 py-2.5 font-bold text-amber-300">미라클 기댓값</th>
                          <th className="px-3 py-2.5 font-bold text-amber-300">미라클 소모 메소</th>
                          <th className="px-3 py-2.5 font-bold text-red-400">천장 횟수</th>
                          <th className="px-3 py-2.5 font-bold text-red-400">천장 소모 메소</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700 text-slate-100">
                        {rows.map(([lv, cost, n1, m1, n2, m2, ceil, cm], i) => (
                          <tr key={lv} className={i % 2 === 1 ? (warn ? 'bg-yellow-950/20 hover:bg-yellow-950/30' : 'bg-slate-800/30 hover:bg-slate-800/50') : 'hover:bg-slate-800/50'}>
                            <td className="px-3 py-2 font-bold text-white">{lv}</td>
                            <td className="px-3 py-2 text-slate-100">{cost}</td>
                            <td className="px-3 py-2 text-slate-300">{n1}회</td>
                            <td className="px-3 py-2 text-slate-300">{m1}</td>
                            <td className="px-3 py-2 text-amber-300 font-bold">{n2}회</td>
                            <td className="px-3 py-2 text-amber-300 font-bold">{m2}</td>
                            <td className="px-3 py-2 text-red-400 font-bold">{ceil}회</td>
                            <td className="px-3 py-2 text-red-400 font-bold">{cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {warn && <p className="text-xs text-red-400 mt-2">{warn as string}</p>}
                </div>
              ))}

              <div>
                <p className="font-bold text-orange-400 mb-2 flex items-center gap-2">▸ 레전드리 (옵션 재설정)</p>
                <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80">
                  <table className="w-full text-xs text-left min-w-[300px] border-collapse">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-600 text-slate-100">
                        <th className="px-3 py-2.5 font-bold">아이템 레벨</th>
                        <th className="px-3 py-2.5 font-bold">1회 재설정 비용</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-100">
                      {[['~159', '40,000,000'], ['~199', '42,500,000'], ['~249', '45,000,000'], ['250~', '50,000,000']].map(([lv, cost], i) => (
                        <tr key={lv} className={i % 2 === 1 ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'hover:bg-slate-800/50'}>
                          <td className="px-3 py-2 font-bold text-white">{lv}</td>
                          <td className="px-3 py-2 text-orange-300 font-bold">{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-600" />

            {/* 아랫잠 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400 inline-block"></span>
                🔵 아랫잠 (에디셔널) 본섭 기댓값
              </h3>

              {[
                {
                  label: '레어 → 에픽', color: 'text-emerald-400', warn: false,
                  rows: [
                    ['~159', '9,750,000', '33', '321,750,000', '20', '195,000,000', '62', '604,500,000'],
                    ['~199', '10,375,000', '33', '342,375,000', '20', '207,500,000', '62', '643,250,000'],
                    ['~249', '11,000,000', '33', '363,000,000', '20', '220,000,000', '62', '682,000,000'],
                    ['250~', '12,250,000', '33', '404,250,000', '20', '245,000,000', '62', '759,500,000'],
                  ],
                },
                {
                  label: '에픽 → 유니크', color: 'text-purple-400', warn: false,
                  rows: [
                    ['~159', '27,300,000', '79', '2,156,700,000', '49', '1,337,700,000', '152', '4,149,600,000'],
                    ['~199', '29,050,000', '79', '2,294,950,000', '49', '1,423,450,000', '152', '4,415,600,000'],
                    ['~249', '30,800,000', '79', '2,433,200,000', '49', '1,509,200,000', '152', '4,681,600,000'],
                    ['250~', '34,300,000', '79', '2,709,700,000', '49', '1,680,700,000', '152', '5,213,600,000'],
                  ],
                },
                {
                  label: '유니크 → 레전드리', color: 'text-yellow-400', warn: '⚠️ 아랫잠 천장 소모 메소가 최대 178억까지! 절대 직작하지 마세요!',
                  rows: [
                    ['~159', '66,300,000', '112', '7,425,600,000', '68', '4,508,400,000', '214', '14,188,200,000'],
                    ['~199', '70,550,000', '112', '7,901,600,000', '68', '4,797,400,000', '214', '15,097,700,000'],
                    ['~249', '74,800,000', '112', '8,377,600,000', '68', '5,086,400,000', '214', '16,007,200,000'],
                    ['250~', '83,300,000', '112', '9,329,600,000', '68', '5,664,400,000', '214', '17,826,200,000'],
                  ],
                },
              ].map(({ label, color, warn, rows }) => (
                <div key={label} className="mb-6">
                  <p className={`font-bold ${color} mb-2 flex items-center gap-2`}>▸ {label}</p>
                  <div className={`overflow-x-auto rounded-xl border ${warn ? 'border-yellow-700/50' : 'border-slate-600'} bg-slate-900/80`}>
                    <table className="w-full text-xs text-left min-w-[700px] border-collapse">
                      <thead>
                        <tr className={`${warn ? 'bg-slate-800 border-b border-yellow-700/40' : 'bg-slate-800 border-b border-slate-600'} text-slate-100`}>
                          <th className="px-3 py-2.5 font-bold">아이템 레벨</th>
                          <th className="px-3 py-2.5 font-bold">1회 재설정</th>
                          <th className="px-3 py-2.5 font-bold text-slate-300">일반 기댓값</th>
                          <th className="px-3 py-2.5 font-bold text-slate-300">일반 소모 메소</th>
                          <th className="px-3 py-2.5 font-bold text-amber-300">미라클 기댓값</th>
                          <th className="px-3 py-2.5 font-bold text-amber-300">미라클 소모 메소</th>
                          <th className="px-3 py-2.5 font-bold text-red-400">천장 횟수</th>
                          <th className="px-3 py-2.5 font-bold text-red-400">천장 소모 메소</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700 text-slate-100">
                        {rows.map(([lv, cost, n1, m1, n2, m2, ceil, cm], i) => (
                          <tr key={lv} className={i % 2 === 1 ? (warn ? 'bg-yellow-950/20 hover:bg-yellow-950/30' : 'bg-slate-800/30 hover:bg-slate-800/50') : 'hover:bg-slate-800/50'}>
                            <td className="px-3 py-2 font-bold text-white">{lv}</td>
                            <td className="px-3 py-2 text-slate-100">{cost}</td>
                            <td className="px-3 py-2 text-slate-300">{n1}회</td>
                            <td className="px-3 py-2 text-slate-300">{m1}</td>
                            <td className="px-3 py-2 text-amber-300 font-bold">{n2}회</td>
                            <td className="px-3 py-2 text-amber-300 font-bold">{m2}</td>
                            <td className="px-3 py-2 text-red-400 font-bold">{ceil}회</td>
                            <td className="px-3 py-2 text-red-400 font-bold">{cm}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {warn && <p className="text-xs text-red-400 mt-2">{warn as string}</p>}
                </div>
              ))}

              <div>
                <p className="font-bold text-orange-400 mb-2 flex items-center gap-2">▸ 레전드리 (옵션 재설정)</p>
                <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80">
                  <table className="w-full text-xs text-left min-w-[300px] border-collapse">
                    <thead>
                      <tr className="bg-slate-800 border-b border-slate-600 text-slate-100">
                        <th className="px-3 py-2.5 font-bold">아이템 레벨</th>
                        <th className="px-3 py-2.5 font-bold">1회 재설정 비용</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-100">
                      {[['~159', '78,000,000'], ['~199', '83,000,000'], ['~249', '88,000,000'], ['250~', '98,000,000']].map(([lv, cost], i) => (
                        <tr key={lv} className={i % 2 === 1 ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'hover:bg-slate-800/50'}>
                          <td className="px-3 py-2 font-bold text-white">{lv}</td>
                          <td className="px-3 py-2 text-orange-300 font-bold">{cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 예외 상황 */}
        <section id="exceptions" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">4. 예외 : 레전드리는 도대체 언제 노리나요?</h2>
          </div>

          <p className="text-slate-100 text-sm sm:text-base mb-6">
            그렇다면 레전드리는 무조건 피해야만 할까요? 아래의 특수한 상황에만 제한적으로 시도하는 것을 권장합니다.
          </p>

          <ul className="space-y-4 text-sm sm:text-base text-slate-100">
            <li className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-600">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">도파민을 주체할 수 없을 때 (딱 1부위만)</strong>
                <span className="text-slate-200">정 직작의 손맛을 보고 싶다면, 망해도 수습이 가능한 수준인 '딱 1개 부위'까지만 메소로 레전드리를 시도하세요.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-600">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">고자본 유저의 '스택받이' 전략</strong>
                <span className="text-slate-200">수십억 메소를 들고 여명 장신구 등 깡통 템을 돌려가며 유니크 유효 옵션을 띄워 팔아 이익을 챙기고, 천장 게이지를 채워 확정적으로 무교 보조무기 등에 레전드리를 가져가는 심화 기술입니다.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-600">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">확정 이벤트 아이템 활용</strong>
                <span className="text-slate-200">큐브를 직접 돌리는 것이 아니라, 이벤트로 얻은 '카르마 레전드리 잠재능력 부여 주문서'를 페어리 하트 등에 확정적으로 바르는 경우입니다.</span>
              </div>
            </li>
          </ul>

          {/* 레전드리 올릴 만한 템 */}
          <div className="mt-6 bg-amber-950/40 border border-amber-600/40 rounded-xl p-5">
            <p className="font-bold text-amber-300 mb-4 flex items-center gap-2 text-base">
              🏆 그래도 레전드리를 보내고 싶다면? 이 아이템들은 올릴 만합니다!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: '엠블렘 윗잠', desc: '영구 귀속이라 기댓값 회수가 가능. 미트라 엠블렘이라면 더욱 우선순위 높음', tag: '추천', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                { name: '제네시스 무기', desc: '최종 장비이므로 레전드리 직작 가치가 충분. 교환 불가라도 투자 가치 있음', tag: '추천', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                { name: '칠흑 장신구', desc: '고레벨 핵심 장신구. 장기 사용 전제라면 레전드리 투자 가치 있음', tag: '추천', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                { name: '에테르넬 방어구', desc: '현 최종 방어구. 장기 사용 전제 시 레전드리 투자 가치 충분', tag: '추천', tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                { name: '17~18성 악세서리', desc: '별이 높아 교체가 어려운 악세라면 레전드리 도전 고려 가능', tag: '조건부', tagColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
                { name: '페어리 하트', desc: '레전드리 잠재 확정 주문서 보유 시 우선 바를 것. 직큐는 비추천', tag: '확정만', tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
              ].map(({ name, desc, tag, tagColor }) => (
                <div key={name} className="bg-slate-900/60 border border-slate-600 rounded-lg p-3.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-bold text-white text-sm">{name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${tagColor}`}>{tag}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-amber-400/80 mt-4 leading-relaxed">
              💡 <strong>핵심 원칙:</strong> 레전드리 잠재능력 확정 주문서(카르마 레전드리 주문서 등)가 있다면 <span className="text-white font-bold">무조건 확정 부여</span>를 우선으로 하세요. 큐브로 직접 도전하는 것보다 압도적으로 효율적입니다.
            </p>
          </div>
        </section>

        {/* 5. 자본을 지키는 3계명 */}
        <section id="commandments" className="mb-14 scroll-mt-24">
          <div className="bg-gradient-to-br from-cyan-950/60 to-blue-900/40 border border-cyan-600/40 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Coins className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl sm:text-3xl font-black text-white">💰 자본을 지키는 미라클 데이 3계명</h2>
              </div>

              <ol className="space-y-6 text-base sm:text-lg">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/30 text-cyan-200 font-black rounded-full border border-cyan-400/40">1</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">등급을 올리는 날이지, 옵션을 뽑는 날이 아니다.</strong>
                    <span className="text-cyan-100 text-sm">공짜 큐브는 옵션용으로 남겨두세요.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/30 text-cyan-200 font-black rounded-full border border-cyan-400/40">2</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">도파민에 속아 경매장 꿀매물을 놓치지 마라.</strong>
                    <span className="text-cyan-100 text-sm">당일 폭락하는 완성품을 사는 자가 최종 승자입니다.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/30 text-cyan-200 font-black rounded-full border border-cyan-400/40">3</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">내 주력 장비를 윗잠 유니크, 에디 에픽까지만 올리고 미련 없이 빠져라.</strong>
                  </div>
                </li>
              </ol>

              <div className="mt-10 p-5 bg-slate-900/70 border border-slate-600 rounded-xl backdrop-blur-sm">
                <p className="text-slate-100 text-sm leading-relaxed text-center break-keep">
                  미라클 타임은 정확한 계산과 전략만 있다면 스펙을 퀀텀 점프시킬 수 있는 최고의 기회입니다.<br/>
                  무리한 확률 싸움에 메소를 낭비하지 마시고, 위 가이드를 참고하여 가장 똑똑하고 현명한 스펙업을 이루시길 응원합니다!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
