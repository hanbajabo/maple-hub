'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, Info, Zap, ShieldAlert, Sparkles, Target, Coins } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function MiracleTimeGuidePage() {
  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
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

          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-amber-500 pl-5 py-2 bg-amber-950/10 rounded-r-lg">
            메이플스토리 스펙업의 핵심 이벤트, '미라클 타임'이 다가왔습니다. 잠재능력 등급 상승 확률이 2배가 되는 엄청난 기회지만, 자칫 잘못된 도파민에 휘둘리면 막대한 메소를 탕진하고 오히려 스펙이 떨어지는 대참사를 겪을 수 있습니다.
            <br/><br/>
            수많은 기댓값과 데이터를 분석해 본 결과, 이번 미라클 타임의 가장 완벽한 승리 공식은 단 하나로 수렴합니다. 성공적인 스펙업을 위해 반드시 알아야 할 <span className="text-amber-300 font-bold">"레전드리 직작을 피해야 하는 이유"</span>부터 부위별 최적화 가이드까지 완벽하게 총정리해 드립니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-amber-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#rule1', '01', '제1원칙 : "레전드리의 함정"을 피하라', 'text-amber-400'],
                ['#guide', '02', '부위별 스펙업 가이드 및 행동 지침', 'text-emerald-400'],
                ['#exceptions', '03', '예외 : 레전드리는 도대체 언제 노리나요?', 'text-rose-400'],
                ['#commandments', '04', '자본을 지키는 미라클 데이 3계명', 'text-cyan-400'],
              ].map(([href, num, label, color]) => (
                <li key={num} className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-amber-500/30 transition-colors">
                  <span className={`${color} font-mono font-bold`}>{num}</span>
                  <a href={href as string} className="text-slate-300 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 1. 제1원칙 */}
        <section id="rule1" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 제1원칙 : "레전드리의 함정"을 피하고 유니크/에픽에서 멈춰라!</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p className="text-slate-300">
              모든 공략에서 고자본, 저자본 할 것 없이 입을 모아 강조하는 절대 불변의 법칙입니다. 미라클 타임의 목표는 무조건 <span className="text-purple-300 font-bold px-2 py-0.5 bg-purple-900/30 rounded border border-purple-500/30">윗잠 유니크 + 에디셔널 에픽</span>입니다. 직접 레전드리 등급업을 노리는 것이 최악의 선택인 3가지 결정적 이유를 알려드립니다.
            </p>

            <div className="grid gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 hover:border-red-500/30 transition-colors">
                <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> 천장과 기댓값의 압박</h3>
                <p className="text-slate-400 text-sm">미라클 타임 혜택으로 확률이 2배가 되더라도, 레전드리를 가기 위한 기본 기댓값 자체는 유니크와 비교도 안 되게 높습니다. 운이 나빠 '천장'을 치게 되면 수십억 메소 단위가 허공으로 증발합니다.</p>
              </div>
              
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 hover:border-orange-500/30 transition-colors">
                <h3 className="font-bold text-orange-400 mb-2 flex items-center gap-2"><Zap className="w-4 h-4" /> 옵션 뽑기라는 진짜 지옥</h3>
                <p className="text-slate-400 text-sm">기적적으로 레전드리를 띄웠다고 끝이 아닙니다. 미라클 타임은 '등급업' 확률만 2배일 뿐, 유효 3줄 옵션을 띄우는 확률은 평소와 똑같습니다. 기껏 레전드리를 달아놓고 옵션이 망해서 기존 유니크보다 스펙이 떨어지는 경우가 부지기수입니다.</p>
              </div>

              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                <h3 className="font-bold text-emerald-400 mb-2 flex items-center gap-2"><Coins className="w-4 h-4" /> 경매장 폭락의 법칙</h3>
                <p className="text-slate-400 text-sm">미라클 타임 당일에는 수많은 고자본 유저들이 아이템을 쏟아냅니다. 이로 인해 레전드리 완성품 매물의 가격이 평소보다 훨씬 저렴해집니다. 직접 지옥을 맛보는 것보다, 메소를 쥐고 있다가 남이 예쁘게 완성해 둔 레전드리 템을 사는 것이 압도적인 이득입니다.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 부위별 스펙업 가이드 */}
        <section id="guide" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Target className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 부위별 스펙업 가이드 및 행동 지침</h2>
          </div>

          <div className="space-y-4">
            <p className="text-slate-300 text-sm mb-2">데이터에 기반하여 가장 가성비가 높은 부위별 세팅 목표를 정리했습니다.</p>
            
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60 shadow-lg">
              <table className="w-full text-sm text-left min-w-[600px] border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-700 text-slate-300">
                    <th className="px-4 py-3 font-bold w-1/4">장비 부위</th>
                    <th className="px-4 py-3 font-bold w-1/4 text-center">추천 등급업 목표</th>
                    <th className="px-4 py-3 font-bold w-1/2">핵심 행동 지침</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  <tr className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">주력 장신구/방어구</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-purple-300 font-bold bg-purple-900/20 px-2 py-1 rounded">윗잠 유니크</span><br/>
                      <span className="text-blue-300 text-xs bg-blue-900/20 px-2 py-0.5 rounded mt-1 inline-block">에디 에픽</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">직접 메소를 돌려 등급업 진행. 가장 효율이 높은 스펙업 구간입니다.</td>
                  </tr>
                  <tr className="bg-slate-900/10 hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">토드 가능 장신구</td>
                    <td className="px-4 py-3 text-center font-bold text-amber-300">토드 매물 활용</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">에디 에픽 매물이 2억~2.5억 이하라면 직접 띄우지 말고 무조건 토드하세요.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">교환 불가 WSE<br/><span className="text-xs text-slate-500">(엠블렘 등)</span></td>
                    <td className="px-4 py-3 text-center font-bold text-purple-300">유니크 2줄 스톱</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">교환 불가 장비의 레전드리 직작은 기댓값 회수가 불가능하므로 <span className="text-red-400 font-bold">강력히 비추천</span>합니다.</td>
                  </tr>
                  <tr className="bg-slate-900/10 hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">교환 가능 보조무기</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-300">완성품 구매</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">직접 돌리지 마세요. 당일 경매장에서 가격이 폭락한 레전드리 매물을 줍는 것이 이득입니다.</td>
                  </tr>
                  <tr className="hover:bg-slate-900/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-white">드메템 (드랍/메소)</td>
                    <td className="px-4 py-3 text-center font-bold text-emerald-300">완성품 구매</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">나만 만들어서 팔 생각하는 게 아닙니다. 시세가 낮아지므로 장사 목적의 직작은 피하세요.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 3. 예외 상황 */}
        <section id="exceptions" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 예외 : 레전드리는 도대체 언제 노리나요?</h2>
          </div>

          <p className="text-slate-300 text-sm sm:text-base mb-6">
            그렇다면 레전드리는 무조건 피해야만 할까요? 아래의 특수한 상황에만 제한적으로 시도하는 것을 권장합니다.
          </p>

          <ul className="space-y-4 text-sm sm:text-base text-slate-300">
            <li className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">도파민을 주체할 수 없을 때 (딱 1부위만)</strong>
                정 직작의 손맛을 보고 싶다면, 망해도 수습이 가능한 수준인 '딱 1개 부위'까지만 메소로 레전드리를 시도하세요.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">고자본 유저의 '스택받이' 전략</strong>
                수십억 메소를 들고 여명 장신구 등 깡통 템을 돌려가며 유니크 유효 옵션을 띄워 팔아 이익을 챙기고, 천장 게이지를 채워 확정적으로 무교 보조무기 등에 레전드리를 가져가는 심화 기술입니다.
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
              <CheckCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">확정 이벤트 아이템 활용</strong>
                큐브를 직접 돌리는 것이 아니라, 이벤트로 얻은 '카르마 레전드리 잠재능력 부여 주문서'를 페어리 하트 등에 확정적으로 바르는 경우입니다.
              </div>
            </li>
          </ul>
        </section>

        {/* 4. 자본을 지키는 3계명 */}
        <section id="commandments" className="mb-14 scroll-mt-24">
          <div className="bg-gradient-to-br from-cyan-950/40 to-blue-900/20 border border-cyan-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-cyan-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Coins className="w-8 h-8 text-cyan-400" />
                <h2 className="text-2xl sm:text-3xl font-black text-white">💰 자본을 지키는 미라클 데이 3계명</h2>
              </div>

              <ol className="space-y-6 text-base sm:text-lg">
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-300 font-black rounded-full border border-cyan-500/30">1</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">등급을 올리는 날이지, 옵션을 뽑는 날이 아니다.</strong>
                    <span className="text-cyan-100/70 text-sm">공짜 큐브는 옵션용으로 남겨두세요.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-300 font-black rounded-full border border-cyan-500/30">2</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">도파민에 속아 경매장 꿀매물을 놓치지 마라.</strong>
                    <span className="text-cyan-100/70 text-sm">당일 폭락하는 완성품을 사는 자가 최종 승자입니다.</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-300 font-black rounded-full border border-cyan-500/30">3</span>
                  <div className="pt-0.5">
                    <strong className="text-white block mb-1">내 주력 장비를 윗잠 유니크, 에디 에픽까지만 올리고 미련 없이 빠져라.</strong>
                  </div>
                </li>
              </ol>

              <div className="mt-10 p-5 bg-slate-900/60 border border-slate-700/50 rounded-xl backdrop-blur-sm">
                <p className="text-slate-300 text-sm leading-relaxed text-center break-keep">
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
