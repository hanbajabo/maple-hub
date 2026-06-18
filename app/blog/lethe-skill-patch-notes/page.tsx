'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, BookOpen, Info, Zap, Settings, CheckCircle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function LetheSkillPatchNotesPage() {
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
            <span className="px-3.5 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">🌐 레테 스킬 개편</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              메이플스토리 레테 본섭 오면서 변경된 스킬 내용 총정리
            </span>
          </h1>

          {/* 타이틀 이미지 */}
          <div className="w-full rounded-2xl overflow-hidden mb-8 border border-slate-700/50 shadow-2xl shadow-purple-900/20">
            <img
              src="/images/lethe/media__1781746726739.png"
              alt="신직업 레테 스킬 변경점 정리"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-cyan-500 pl-5 py-2 bg-cyan-950/10 rounded-r-lg">
            오늘은 이번 본섭 패치로 완전히 환골탈태한 <span className="text-white font-bold">레테</span>의 스킬 변경점과 핵심 딜 사이클 변화를 아주 알기 쉽게, 핵심만 쏙쏙 뽑아 정리해 드리려고 합니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#freedom', '01', '족쇄 해방: 구조 삭제', 'text-cyan-400'],
                ['#cooldown', '02', '미친 회전율: 이딕트 쿨감', 'text-pink-400'],
                ['#ai', '03', '소환수 AI 및 편의성', 'text-yellow-400'],
                ['#summary', '04', '레테 개편 3줄 요약', 'text-emerald-400'],
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

        {/* 1. 족쇄 해방 */}
        <section id="freedom" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Info className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. ⛓️ 족쇄 해방: 강제되던 스킬 순서와 오리진 구조 삭제</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>
              가장 먼저 반길 만한 소식은, 레테 유저들을 답답하게 만들었던 불합리한 구조와 순서 강제가 완전히 사라졌다는 점입니다.
            </p>

            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781745950065.png"
                alt="오버로드 : 이터널 게이즈 - 오리진 텍스트 변경점"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">오버로드 : 이터널 게이즈 - 오리진 텍스트 변경점</p>
            </div>
            
            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781745965119.png"
                alt="체인 커맨드 - 맹약 조건 완화 텍스트"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">체인 커맨드 - 맹약 조건 완화 텍스트</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <p className="font-bold text-cyan-300 mb-2">오리진 선사용 강제 삭제</p>
              <p className="text-slate-300">
                기존에는 극딜을 할 때 무조건 6차 오리진 스킬을 제일 먼저 써야만 제대로 된 딜이 나오는 답답한 구조였습니다. 
                이제는 이 구조적 족쇄가 삭제되어 훨씬 유연하게 극딜기를 배분할 수 있게 되었습니다.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <p className="font-bold text-purple-300 mb-2">시퀀스 정상화 (순서 강제 X)</p>
              <p className="text-slate-400 mb-2">
                <span className="text-slate-300 font-semibold text-sm">예전에는:</span> 맹약을 완성하려면 소환수 스킬을 반드시 '검마(템플러) → 늑구(바르가르) → 염소(아즈라스)'라는 정해진 순서대로 써야만 했죠.
              </p>
              <p className="text-slate-300">
                <span className="text-purple-300 font-semibold text-sm">바뀐 점:</span> 이제는 <strong>'5차 이하 오버로드 스킬 아무거나 3번 사용'</strong>하면 맹약이 완성되어 쿨타임이 초기화되는 구조로 정상화되었습니다. 순서가 꼬여서 딜이 나락으로 가는 불상사가 아예 사라진 것입니다.
              </p>
            </div>
          </div>
        </section>

        {/* 2. 미친 회전율의 시작 */}
        <section id="cooldown" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. ⚡ 미친 회전율의 시작: 이딕트 쿨타임 대폭 감소</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>
              이번 패치로 레테는 메이플스토리 내에서도 손꼽히는 '재사용/쿨뚝 수저(스킬 난사 직업)'로 진화했습니다.
            </p>

            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781745976876.png"
                alt="이딕트 : 템플러 아츠 - 쿨타임/딜레이 감소 확인용"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">이딕트 : 템플러 아츠 - 쿨타임/딜레이 감소 확인용</p>
            </div>
            
            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781745986633.png"
                alt="이딕트 : 램페이지 VI - 쿨타임 감소 확인용"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">이딕트 : 램페이지 VI - 쿨타임 감소 확인용</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-pink-300 mb-2">이딕트 기본 쿨타임 30초 → 20초</p>
                <p className="text-slate-300 text-sm">
                  레테의 핵심 타격기인 '이딕트' 시리즈의 기본 쿨타임이 20초로 파격적으로 줄었습니다. 
                  게다가 스킬을 쓸 때 멈칫하던 답답한 선딜레이도 확 줄어들었습니다.
                </p>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <p className="font-bold text-pink-300 mb-2">극딜 중 쿨타임 40% 감소</p>
                <p className="text-slate-300 text-sm">
                  체인 커맨드 맹약 최종 완성 시, 이딕트 쿨타임이 즉시 초기화될 뿐만 아니라 
                  30초(극딜 타임) 동안 이딕트의 쿨타임이 무려 40%나 감소합니다.
                </p>
              </div>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-800/50 rounded-xl p-5 mt-4">
              <p className="font-bold text-emerald-400 mb-2">💡 결론</p>
              <p className="text-emerald-100/80">
                고효율 쿨감 모자와 어빌리티를 맞추면, 극딜 30초 동안 이딕트를 난사할 수 있는 엄청난 폭딜 구조가 완성되었습니다.
              </p>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* 3. 소환수 평딜 너프 및 편의성 */}
        <section id="ai" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Settings className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 🤖 소환수 평딜 너프? 대신 똑똑해진 AI와 사냥 편의성</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>보스전에서 소환수들의 비중이 어떻게 변했는지도 중요하겠죠?</p>

            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781746563834.png"
                alt="인보크 : 바르가르 - 평딜 하향 텍스트"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">인보크 : 바르가르 - 평딜 하향 텍스트</p>
            </div>
            
            <div className="w-full rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-800/50 flex flex-col items-center">
              <img
                src="/images/lethe/media__1781746582943.png"
                alt="서스테인 - 버프 조건 완화 텍스트"
                className="w-full h-auto object-contain"
              />
              <p className="text-xs text-center text-slate-400 py-2 w-full bg-slate-900 border-t border-slate-700">서스테인 - 버프 조건 완화 텍스트</p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <p className="font-bold text-red-400 mb-2">소환수 기본 평딜 하향</p>
              <p className="text-slate-300">
                본체가 스킬을 난사하게 대가로, 가만히 있어도 소환수들이 알아서 넣던 기본 데미지(평딜)의 계수는 너프되었습니다.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
              <p className="font-bold text-yellow-400 mb-2">편의성 대폭발</p>
              <p className="text-slate-300">
                대신 소환수 버프(임펠, 서스테인 등)를 줄 때 빡빡했던 위치 조건이 <strong>'소환수 중 한 마리만 받아도 전체 적용'</strong>으로 대폭 완화되었습니다. 
                게다가 소환수들의 공격 범위 자체가 크게 상향되어, 사냥이나 보스 잡기가 훨씬 더 편하고 좋아졌습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 4. 3줄 요약 */}
        <section id="summary" className="mb-14 scroll-mt-24 bg-emerald-900/20 border border-emerald-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-800/50 pb-4">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">💡 레테 스킬 개편 3줄 요약</h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="flex gap-4 items-start bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <span className="text-emerald-400 font-bold mt-0.5">1.</span>
              <div>
                <p className="font-bold text-emerald-300 mb-1">족쇄 삭제</p>
                <p className="text-slate-300">오리진 스킬을 먼저 써야 하거나, 소환수 스킬을 정해진 순서대로(검마-&gt;늑구-&gt;염소) 써야 했던 불합리한 조작 구조가 완전히 사라졌습니다.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <span className="text-emerald-400 font-bold mt-0.5">2.</span>
              <div>
                <p className="font-bold text-emerald-300 mb-1">이딕트 난사</p>
                <p className="text-slate-300">이딕트의 쿨타임이 20초로 줄고, 극딜 30초 동안에는 쿨타임이 40%나 추가 감소하여 엄청난 스킬 회전율을 보여줍니다.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              <span className="text-emerald-400 font-bold mt-0.5">3.</span>
              <div>
                <p className="font-bold text-emerald-300 mb-1">플레이 스타일 변화</p>
                <p className="text-slate-300">소환수가 가만히 넣는 평딜은 너프되었지만, 유저가 직접 이딕트를 쉴 새 없이 돌리며 액션감 있게 딜을 넣는 <strong>'꿀잼 스킬 난사형 직업'</strong>으로 재탄생했습니다.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
