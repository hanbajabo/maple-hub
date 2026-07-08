'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, AlertTriangle, CheckCircle, Info, Zap, ShieldAlert, Sparkles, Star, Coins, Flame, TrendingUp, BarChart3, Shield, Gem } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function SundayMapleStarforceJul5Page() {
  return (
    <div className="min-h-screen bg-[#080711] text-white pb-24 font-sans leading-relaxed">
      {/* 배경 그라디언트 */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* 뒤로가기 헤더 */}
      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-700 mx-auto">
        <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-amber-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>블로그 홈으로</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">

        {/* ───────── 타이틀 영역 ───────── */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> 2026년 7월 5일
            </span>
            <span className="px-3.5 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">⭐ 샤이닝 스타포스</span>
            <span className="px-3.5 py-1 text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">☀️ 썬데이 메이플</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              썬데이 메이플 샤타포스 완벽 공략
            </span>
          </h1>

          {/* 배너 이미지 */}
          <div className="mb-8 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
            <img
              src="/shining-starforce-info.png"
              alt="샤이닝 스타포스 타임 - 강화 비용 30% 할인 / 파괴 확률 30% 감소 / 흔적 복구 비용 20% 할인"
              className="w-full object-cover"
            />
          </div>

          {/* 최종 목표 배지 */}
          <div className="mb-8 bg-gradient-to-r from-amber-950/60 to-orange-950/60 border border-amber-600/40 rounded-2xl p-5 flex items-center gap-4">
            <span className="text-4xl shrink-0">🏆</span>
            <div>
              <p className="text-amber-300 font-black text-base mb-1">이 공략의 최종 목표</p>
              <p className="text-white font-bold text-lg">하드 메이린을 <span className="text-amber-300">130% 컷</span>으로 잡을 수 있는 템세팅</p>
              <p className="text-slate-400 text-xs mt-1">노칠흑 기준 · 여명 4세트 + 보스 장신구 21성 조합</p>
              <p className="text-slate-400 text-xs mt-2.5 border-t border-slate-700/60 pt-2 flex items-center gap-1">
                <span>※ 해당 글은 메이플 인벤의</span>
                <a
                  href="https://www.inven.co.kr/board/maple/5974/6816029"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:underline font-semibold"
                >
                  'Flame'님의 글
                </a>
                <span>을 참고했습니다.</span>
              </p>
            </div>
          </div>

          {/* 목차 */}
          <div className="bg-slate-800/60 border border-slate-600 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-cyan-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['#golden-rule', '01', '황금 원칙 : 직작보다 경매장이 답이다', 'text-amber-400'],
                ['#item-setup', '02', '가성비 장신구 세팅 구성 총정리', 'text-emerald-400'],
                ['#potential', '03', 'Step 1 : 잠재능력 커트라인 먼저 체크', 'text-purple-400'],
                ['#starforce-road', '04', 'Step 2~4 : 단계별 강화 로드맵', 'text-cyan-400'],
                ['#extras', '05', '이 외에 신경 써야 할 추가 스펙업', 'text-amber-400'],
                ['#summary', '06', '핵심 요약 & 마무리', 'text-rose-400'],
              ].map(([href, num, label, color]) => (
                <li key={num} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
                  <span className={`${color} font-mono font-bold`}>{num}</span>
                  <a href={href as string} className="text-slate-100 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* ───────── 1. 황금 원칙 ───────── */}
        <section id="golden-rule" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">1. 황금 원칙 : 직작보다 경매장이 답이다</h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-100 leading-relaxed break-keep">
            {/* 핵심 원칙 박스 */}
            <div className="bg-amber-950/50 border border-amber-600/50 rounded-xl p-5">
              <p className="text-amber-300 font-black text-base mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" /> 제1원칙
              </p>
              <p className="text-slate-100 leading-relaxed">
                어떤 상황에서도 <span className="text-amber-300 font-bold">직접 뽑는(직작)</span> 것보다{' '}
                <span className="text-white font-bold px-2 py-0.5 bg-amber-900/40 rounded border border-amber-500/40">잠재능력이 완성된 깡통 아이템을 경매장에서 싸게 사서 스타포스를 올리는 것</span>이
                메소 효율 면에서 압도적으로 유리합니다.
                <br />
                <span className="text-amber-200 font-semibold mt-2 inline-block">
                  ➔ 아예 스타포스 + 잠재능력 완성형 아이템을 싸게 구매하는 것이 가장 최고!
                </span>
              </p>
            </div>

            <div className="my-6 rounded-2xl overflow-hidden border border-slate-700 shadow-xl">
              <img
                src="/event-items-info.png"
                alt="카르마 스타포스 17성 강화권 및 큐브 정보"
                className="w-full object-cover"
              />
            </div>

            <p className="text-slate-200">
              그럼에도 착용 중인 아이템, 또는 이벤트 강화권(17성 강화권·큐브 등) + 보스 메멘토 큐브를 적극 활용해
              직접 세팅하고 싶다면, 아래 가이드대로 샤타포스를 활용하세요.
            </p>

            {/* 잠재능력 목표 */}
            <div className="bg-purple-950/40 border border-purple-700/50 rounded-xl p-5">
              <h3 className="font-bold text-purple-300 mb-4 flex items-center gap-2">
                <Gem className="w-4 h-4" /> 잠재능력 최종 목표
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-slate-900/60 rounded-lg p-3 border border-amber-600/30">
                  <p className="text-amber-300 font-bold text-xs mb-1">🟡 윗잠 (잠재능력)</p>
                  <p className="text-white font-bold text-lg">주스탯 <span className="text-amber-300">21%</span></p>
                  <p className="text-slate-200 text-sm mt-1.5 font-medium">처음엔 유니크 2줄 15%로 시작 → 이후 21% 목표</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 border border-purple-600/30">
                  <p className="text-purple-300 font-bold text-xs mb-1">🟣 에디셔널 (아랫잠)</p>
                  <p className="text-white font-bold text-lg">에픽 <span className="text-purple-300">2줄</span> <span className="text-slate-300 text-sm">(주스탯 4% + 공/마 10)</span></p>
                  <p className="text-slate-200 text-sm mt-1.5 font-medium">초반엔 공/마 +10 세팅 후 점진적 업그레이드</p>
                </div>
              </div>
              <div className="mt-3 px-4 py-3 bg-purple-900/40 border-l-4 border-purple-400 rounded-r-lg">
                <p className="text-purple-200 text-sm">
                  💡 <span className="font-bold">전략 팁:</span> 3줄 유효 노리는 것은 많이 힘드니까 유니크 2줄로 쓰다가 팔고 레전드리 2~3줄 아이템을 사거나, 아니면 미라클 타임에 재미삼아 레전드리를 노려보는 것을 추천합니다.
                </p>
              </div>
            </div>

            {/* 17성 강화권 정보 */}
            <div className="bg-cyan-950/40 border border-cyan-700/50 rounded-xl p-5">
              <h3 className="font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" /> 카르마 스타포스 17성 강화권 (160제) 획득처
              </h3>
              
              <div className="my-4 rounded-xl overflow-hidden border border-slate-700 shadow-md">
                <img
                  src="/event-items-locations.png"
                  alt="챌린저스 샵 및 보급 일지 획득처 정보"
                  className="w-full object-cover"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-900/60 rounded-lg p-3 border border-cyan-600/30 flex items-center gap-3">
                  <span className="text-2xl">🪙</span>
                  <div>
                    <p className="text-white font-bold text-sm">챌섭 코인샵</p>
                    <p className="text-cyan-300 font-black text-lg">3개</p>
                  </div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 border border-cyan-600/30 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-white font-bold text-sm">메인 이벤트 출석 보상</p>
                    <p className="text-cyan-300 font-black text-lg">2개 <span className="text-slate-400 text-xs font-normal">(4주차/11주차)</span></p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-cyan-900/40 border-l-4 border-cyan-400 rounded-r-lg">
                <p className="text-cyan-200 font-bold text-sm">
                  ✅ 강화권 총 <span className="text-white">5개</span>로 장신구 9개 중 5개는 17성을 공짜로 보낼 수 있습니다!<br />
                  <span className="text-slate-300 font-normal">골든 클로버 벨트 / 가디언 엔젤 링 / 에스텔라 이어링 등 값싼 아이템을 샤타포스 때 먼저 강화하는 것을 추천합니다.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 2. 장신구 세팅 구성 ───────── */}
        <section id="item-setup" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">2. 가성비 장신구 세팅 구성 총정리</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-100 leading-relaxed break-keep">
            <p className="text-slate-300">
              핵심 전략은 <span className="text-emerald-300 font-bold">여명 4세트 효과 (보공 10% + 방무 10%)</span>를 챙기면서,
              21성 강화가 그나마 가능한 가성비 템들을 착용하는 것입니다.
            </p>

            {/* 기본 세팅 구성 */}
            <div className="bg-slate-900/60 border border-emerald-600/30 rounded-xl p-4 mb-2">
              <p className="text-emerald-300 font-bold text-sm mb-3">📋 기본 세팅 구성</p>
              <div className="flex flex-wrap gap-2">
                {['제네시스 해방 무기', '아이템 버닝 장비', '여명 4부위', '블빈마/파풀마', '골든 클로버 벨트/분노한 자쿰의 벨트', '도미네이터 펜던트', '리레링', '이벤트 링 2개 or 마이스터링', '플라즈마 하트'].map(item => (
                  <span key={item} className="px-2.5 py-1 bg-emerald-900/30 text-emerald-200 border border-emerald-600/30 rounded-full text-xs font-medium">{item}</span>
                ))}
              </div>
            </div>

            {/* 여명 4세트 파트 */}
            <div>
              <h3 className="font-bold text-emerald-300 mb-3 flex items-center gap-2 text-base">
                🌅 여명 세트 (4부위 필수)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80 shadow-lg">
                <table className="w-full text-sm text-left min-w-[520px] border-collapse">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-600 text-slate-100">
                      <th className="px-4 py-3 font-bold">부위</th>
                      <th className="px-4 py-3 font-bold">아이템</th>
                      <th className="px-4 py-3 font-bold text-center">목표 성급</th>
                      <th className="px-4 py-3 font-bold">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-100">
                    <tr className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">반지</td>
                      <td className="px-4 py-3">여명의 가디언 엔젤 링</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">핵심 여명 부위</td>
                    </tr>
                    <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">펜던트</td>
                      <td className="px-4 py-3">데이브레이크 펜던트</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">핵심 여명 부위</td>
                    </tr>
                    <tr className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">얼굴장식</td>
                      <td className="px-4 py-3">트와일라이트 마크</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">핵심 여명 부위</td>
                    </tr>
                    <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">귀고리</td>
                      <td className="px-4 py-3">에스텔라 이어링</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">핵심 여명 부위</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 px-4 py-3 bg-amber-900/30 border-l-4 border-amber-500 rounded-r-lg">
                <p className="text-amber-200 text-sm">
                  💡 <span className="font-bold">여명 세트 강화 팁:</span> 4부위 중에 1부위는 18성을 만들어도 됩니다. 자신의 아이템 상황에 맞춰 여명 4개 중에 1개는 최종 목표 18성으로 하세요.
                </p>
              </div>
            </div>

            {/* 보스 장신구 파트 */}
            <div>
              <h3 className="font-bold text-purple-300 mb-3 flex items-center gap-2 text-base">
                💜 보스 장신구 & 기타
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-600 bg-slate-900/80 shadow-lg">
                <table className="w-full text-sm text-left min-w-[520px] border-collapse">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-600 text-slate-100">
                      <th className="px-4 py-3 font-bold">부위</th>
                      <th className="px-4 py-3 font-bold">아이템</th>
                      <th className="px-4 py-3 font-bold text-center">목표 성급</th>
                      <th className="px-4 py-3 font-bold">비고</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-slate-100">
                    <tr className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">눈장식</td>
                      <td className="px-4 py-3">블랙빈 마크 (파풀마)</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">20성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">—</td>
                    </tr>
                    <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">벨트</td>
                      <td className="px-4 py-3">골든 클로버 벨트(분자벨)</td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">—</td>
                    </tr>
                    <tr className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">펜던트 2</td>
                      <td className="px-4 py-3">도미네이터 펜던트</td>
                      <td className="px-4 py-3 text-center"><span className="text-emerald-300 font-bold bg-emerald-900/30 px-2 py-0.5 rounded">18성 유지</span></td>
                      <td className="px-4 py-3 text-xs text-amber-300">가성비 타협</td>
                    </tr>
                    <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">반지 2</td>
                      <td className="px-4 py-3">마이스터 링 <span className="text-purple-300 text-xs">(윗잠 27%上)</span></td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">21성</span></td>
                      <td className="px-4 py-3 text-xs text-cyan-300 font-medium">여명셋에서 아낀 돈을 투자</td>
                    </tr>
                    <tr className="hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">이벤트 링</td>
                      <td className="px-4 py-3">이벤트 링 <span className="text-purple-300 text-xs">(레전 21%上 / 에디 에픽 2줄)</span></td>
                      <td className="px-4 py-3 text-center"><span className="text-purple-300 font-bold bg-purple-900/30 px-2 py-0.5 rounded">잠재 우선</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">—</td>
                    </tr>
                    <tr className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors">
                      <td className="px-4 py-3 font-semibold text-white">하트</td>
                      <td className="px-4 py-3">플라즈마 하트 <span className="text-purple-300 text-xs">(최소 주흔 30% 완작)</span></td>
                      <td className="px-4 py-3 text-center"><span className="text-amber-300 font-bold bg-amber-900/30 px-2 py-0.5 rounded">18성 이상</span></td>
                      <td className="px-4 py-3 text-slate-400 text-xs">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 px-4 py-3 bg-slate-800/60 border-l-4 border-purple-500 rounded-r-lg">
                <p className="text-slate-200 text-sm">
                  💡 <span className="font-bold text-white">도미네이터 & 하트 팁:</span> 도미네이터와 플라즈마 하트 역시 무리해서 스타포스를 올리기 보다는 18성으로 가성비를 챙기는 것을 추천합니다.
                </p>
              </div>
            </div>

            {/* 무보엠 박스 */}
            <div className="bg-rose-950/40 border border-rose-700/50 rounded-xl p-5">
              <h3 className="font-bold text-rose-300 mb-3 flex items-center gap-2">
                <Flame className="w-4 h-4" /> 칠흑 공백을 메우는 핵심 : 무기 / 보조 / 엠블렘 (무보엠) 체급업
              </h3>
              <p className="text-slate-200 text-sm mb-3">
                칠흑 세트 효과가 빠진 만큼의 최종 데미지는 <span className="text-white font-bold">무보엠 체급</span>으로 커버해야 합니다.
                장신구에서 칠흑을 배제하며 아낀 메소를 보조무기와 엠블렘에 집중 투자하세요.
              </p>

              {/* 추천 로드맵 */}
              <div className="bg-slate-900/40 rounded-xl p-3 border border-rose-900/30 mb-4 text-xs sm:text-sm text-slate-200">
                <span className="text-rose-300 font-bold">💡 무보엠 세팅 로드맵:</span> 제네시스 무기 우선 세팅 ➔ 보조무기는 구매하는 것을 추천 ➔ 엠블렘은 미트라 추천
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-900/60 rounded-lg p-3 border border-rose-600/20">
                  <p className="text-rose-300 font-bold text-xs mb-1">무보엠 기본 세팅</p>
                  <p className="text-white text-sm">레전 (3줄 유효) / 에픽 (2줄 유효)</p>
                  <p className="text-slate-400 text-xs mt-1">하드 메이린 130%上</p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3 border border-amber-600/20">
                  <p className="text-amber-300 font-bold text-xs mb-1">140% 이상 원할 때</p>
                  <p className="text-white text-sm">레전 / 유니크 <span className="text-slate-400">(5줄 유효급)</span></p>
                  <p className="text-slate-400 text-xs mt-1">배율이 기하급수적으로 상승</p>
                </div>
              </div>

              {/* 임시 옵션 및 상세 가이드 */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-rose-900/20 space-y-2.5 text-xs sm:text-sm mb-4">
                <div>
                  <p className="text-rose-300 font-bold mb-1">🛠️ 보조무기 / 엠블렘 임시 옵션</p>
                  <p className="text-slate-200">
                    <span className="font-semibold text-white">잠재:</span> 유니크 공/마 15% | <span className="font-semibold text-white">에디:</span> 에픽 공 6%
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-800 space-y-2">
                  <p className="text-white font-bold text-xs">✨ 무/보/엠 유효 옵션 정리</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-amber-300 font-bold text-xs mb-1">🎯 잠재 유효 옵션</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        보스 데미지, 공/마%<br />
                        <span className="text-slate-400">(방무 옵션은 무보엠 합해서 최대 2줄)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-300 font-bold text-xs mb-1">⚡ 에디 유효 옵션</p>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        공/마% 최소 2줄
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-amber-300 leading-relaxed font-semibold">
                ⚠️ 적어도 엠블렘은 돈을 좀 쓰더라도 후반을 위해 미트라의 분노 엠블렘을 구매하여 잠재능력 작을 하는 것을 추천합니다.
              </p>
            </div>
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* ───────── 3. 잠재능력 커트라인 ───────── */}
        <section id="potential" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Gem className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Step 1. 스타포스 전 필수 체크! '잠재능력' 커트라인</h2>
          </div>

          <div className="space-y-5 text-sm sm:text-base text-slate-100 leading-relaxed break-keep">
            <div className="bg-red-950/40 border border-red-700/50 rounded-xl p-5">
              <h3 className="font-bold text-red-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> 깡통에 무작정 별 달지 마세요!
              </h3>
              <p className="text-slate-200 text-sm">
                스타포스는 투자 기댓값이 높습니다. 뼈대인 잠재능력이 허술하면 아이템 가치가 급락해
                나중에 제값을 받을 수 없습니다. <span className="text-red-300 font-bold">반드시 잠재능력을 먼저 확인하세요.</span>
                <br />
                <span className="text-amber-300 font-semibold mt-1.5 inline-block">
                  (깡통 잠재템을 살 때는 레전드리 유효 최소 2줄 이상을 권장함 - 꼭 저렴할 때 사세요! 시세 확인 필수!)
                </span>
              </p>
            </div>

            {/* 최소 권장 */}
            <div className="bg-slate-900/60 border border-slate-700/60 rounded-xl p-5">
              <p className="text-slate-300 font-bold text-sm mb-4">📌 스타포스 진행 전 최소 권장 잠재능력</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-amber-950/40 border border-amber-700/30 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">윗잠 (잠재능력)</p>
                    <p className="text-amber-300 font-bold">주스탯 21% 이상</p>
                    <p className="text-slate-300 text-xs mt-1">처음엔 유니크 2줄 15%로 시작해도 OK</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-purple-950/40 border border-purple-700/30 rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-sm">에디셔널 (아랫잠)</p>
                    <p className="text-purple-300 font-bold">에픽 2줄 이상</p>
                    <p className="text-slate-300 text-xs mt-1">주스탯 4% + 공/마 10 조합</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 현실적인 세팅 팁 */}
            <div className="px-5 py-4 bg-emerald-900/30 border-l-4 border-emerald-400 rounded-r-xl">
              <p className="text-emerald-300 font-bold text-sm mb-2">✅ 가장 현실적인 세팅 순서</p>
              <ol className="space-y-2 text-sm text-slate-200">
                <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">①</span> 잠재 완성된 깡통 아이템을 경매장에서 저렴하게 구매</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">②</span> 너무 비싸거나 이벤트/메멘토 큐브로 직작할 계획이라면, 먼저 전체템을 유니크 2줄 15%로 맞춤</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">③</span> 이후 21% 목표로 차근차근 업그레이드</li>
                <li className="flex gap-2"><span className="text-emerald-400 font-bold shrink-0">④</span> 그냥 기존 템을 팔고 레전드리 2~3줄 아이템 구입, 또는 미라클 타임 때, 재미삼아 도전</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ───────── 4. 단계별 강화 로드맵 ───────── */}
        <section id="starforce-road" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Step 2~4. 단계별 강화 로드맵</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-100 leading-relaxed break-keep">

            {/* Step 2 */}
            <div className="rounded-xl overflow-hidden border border-emerald-700/50">
              <div className="bg-emerald-950/60 px-5 py-3 flex items-center gap-3">
                <span className="text-emerald-300 font-black text-xl font-mono">Step 2</span>
                <div>
                  <p className="text-white font-bold">'17성 둘둘'로 단단한 기반 다지기</p>
                  <p className="text-emerald-400 text-xs">모든 장착 부위를 17성으로 통일</p>
                </div>
              </div>
              <div className="bg-slate-900/60 px-5 py-4 space-y-3">
                <p className="text-slate-200">
                  장비 하나에 꽂혀 22성을 무리하게 누르기보다, <span className="text-emerald-300 font-bold">전체적인 밸런스를 먼저 맞추는 것</span>이 우선입니다.
                  카르마 17성 강화권 5개를 활용하면 절반은 공짜로 해결됩니다.
                </p>
                <div className="px-4 py-3 bg-emerald-900/40 border-l-4 border-emerald-400 rounded-r-lg">
                  <p className="text-emerald-200 text-sm">
                    ⭐ <span className="font-bold">샤타포스 혜택 최대 활용 구간:</span> 강화 비용 30% 할인 + 파괴 확률 30% 감소가 모두 적용됩니다.
                    안전하게 17성까지 가는 비용이 대폭 낮아져 전투력을 가장 효율적으로 올릴 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl overflow-hidden border border-amber-700/50">
              <div className="bg-amber-950/60 px-5 py-3 flex items-center gap-3">
                <span className="text-amber-300 font-black text-xl font-mono">Step 3</span>
                <div>
                  <p className="text-white font-bold">18성 도전 — 하드 메이린 트라이의 시작점</p>
                  <p className="text-amber-400 text-xs">전 부위 17성 완성 후 주요 부위 18성 업그레이드</p>
                </div>
              </div>
              <div className="bg-slate-900/60 px-5 py-4 space-y-3">
                <p className="text-slate-200">
                  전 부위 17성이 완성됐다면, 파괴 리스크를 조금 감수하고 체급을 한 단계 끌어올릴 차례입니다.
                  스페어가 충분하거나 확정 복구 비용이 저렴한 부위부터 18성을 달아줍니다.
                  <br />
                  <span className="text-amber-300 font-semibold mt-1.5 inline-block">
                    ➔ 심볼/헥사 내실이 잘 되어 있다면 하드메이린 100~110%로 도전 가능한 스펙 달성
                  </span>
                </p>
                <div className="px-4 py-3 bg-amber-900/40 border-l-4 border-amber-400 rounded-r-lg">
                  <p className="text-amber-200 text-sm font-bold mb-1">⚠️ 18성에서 멈출 부위</p>
                  <p className="text-slate-200 text-sm">
                    <span className="text-amber-300">플라즈마 하트 / 도미네이터 펜던트</span> — 상위 호환 템이 있거나 가성비가 떨어지므로 18성으로 마무리.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl overflow-hidden border border-cyan-700/50">
              <div className="bg-cyan-950/60 px-5 py-3 flex items-center gap-3">
                <span className="text-cyan-300 font-black text-xl font-mono">Step 4</span>
                <div>
                  <p className="text-white font-bold">단계별 '순환 강화'로 21성 완성</p>
                  <p className="text-cyan-400 text-xs">18성 → 19성 → 20성 → 21성 순으로 순환</p>
                </div>
              </div>
              <div className="bg-slate-900/60 px-5 py-4 space-y-3">
                <p className="text-slate-200">
                  하드 메이린을 <span className="text-cyan-300 font-bold">130% 컷</span>으로 잡으려면 최종적으로 21성 세팅이 필요합니다.
                  핵심은 한 아이템을 집중 공략하는 것이 아니라 <span className="text-white font-bold">전 부위를 한 단계씩 돌아가며 올리는 순환 강화</span>입니다.
                </p>

                {/* 순환 강화 흐름 */}
                <div className="bg-slate-800/60 rounded-xl p-4">
                  <p className="text-cyan-300 font-bold text-xs mb-3">🔄 순환 강화 흐름</p>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {['전 부위\n17성', '전 부위\n18성', '핵심 부위\n19성', '핵심 부위\n20성', '핵심 부위\n21성 ✅'].map((step, i, arr) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="bg-cyan-900/40 border border-cyan-600/40 rounded-lg px-3 py-2 text-center">
                          <p className="text-cyan-300 font-bold text-xs whitespace-pre">{step}</p>
                        </div>
                        {i < arr.length - 1 && <span className="text-slate-500">→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 21성 목표 부위 */}
                <div>
                  <p className="text-slate-400 text-xs mb-2">📌 21성 우선 달성 목표 부위</p>
                  <div className="flex flex-wrap gap-2">
                    {['가디언 엔젤 링', '데이브레이크 펜던트', '트와일라이트 마크', '골든 클로버 벨트', '마이스터 링'].map(item => (
                      <span key={item} className="px-2.5 py-1 bg-cyan-900/30 text-cyan-200 border border-cyan-600/30 rounded-full text-xs">{item}</span>
                    ))}
                  </div>
                </div>

                <div className="px-4 py-3 bg-cyan-900/40 border-l-4 border-cyan-400 rounded-r-lg">
                  <p className="text-cyan-200 text-sm">
                    💡 <span className="font-bold">왜 21성인가?</span> 22성 도전 시 터지는 리스크와 메소 소모는 상상 초월입니다.
                    값비싼 칠흑 없이도, <span className="text-white font-bold">여명 4세트 + 보장 21성 체급</span>만으로 하드 메이린 챌린저 달성에 충분한 딜을 뽑을 수 있습니다.
                  </p>
                </div>

                {/* 스타포스 계산기 링크 */}
                <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-white font-bold text-base">🧮 스타포스 강화 전략 설계해보기</p>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      스타포스를 진행할 때, 어떤 아이템에 파괴 방지를 할 지, 파괴 후 아이템 복구 할 때, 12성으로 그냥 복구 할지 아니면 확정 복구를 할 지에 따라서 기댓값도 굉장히 많이 달라집니다. 해당 강화와 관련해서 스타포스 기댓값 계산기를 만들었으니 활용해보세요.
                    </p>
                  </div>
                  <Link prefetch={false}
                    href="/tools/starforce"
                    className="shrink-0 px-5 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 text-center"
                  >
                    계산기 바로가기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── 5. 이 외에 신경 써야 할 추가 스펙업 ───────── */}
        <section id="extras" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">5. 이 외에 신경 써야 할 추가 스펙업 요소</h2>
          </div>

          <p className="text-slate-100 text-sm sm:text-base mb-6 break-keep">
            하드 메이린 130% 컷을 완벽히 준비하기 위해서는 장비 강화(스타포스, 잠재능력) 외에도 다음과 같은 핵심 내실/기초 스펙업 요소를 반드시 갖춰야 합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { emoji: '📈', title: '레벨뻥을 위한 285레벨 달성', desc: '레벨 차이에 따른 데미지 보정(레벨뻥)을 위해 285레벨을 달성하세요. 레벨 1당 메이린 상대 배율이 약 2%씩 상승합니다.' },
              { emoji: '⚔️', title: '6차 스킬 강화 필수', desc: '솔 에르다 조각을 최소 1,800개 이상 사용하여 핵심 마스터리 코어 및 오리진 스킬의 성능을 확실하게 끌어올려야 합니다.' },
              { emoji: '📊', title: 'HEXA 스탯 떡작', desc: '헥사 스탯은 2개 정도 떡작을 진행하여 스펙업을 노립니다.' },
              { emoji: '🛡️', title: '심볼 만렙 & 어센틱 심볼 강화', desc: '아케인 심볼 만렙은 당연히 필수이며, 어센틱 심볼 역시 매일 일일 퀘스트를 빼놓지 않고 수행하여 꾸준히 강화해 주어야 합니다.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 flex gap-3 items-start hover:border-amber-500/40 transition-colors">
                <span className="text-2xl shrink-0">{emoji}</span>
                <div>
                  <p className="font-bold text-white text-sm mb-1">{title}</p>
                  <p className="text-slate-300 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <InArticleAd dataAdSlot="8162808816" className="my-10" />

        {/* ───────── 6. 요약 ───────── */}
        <section id="summary" className="mb-14 scroll-mt-24 bg-slate-800/50 border border-slate-600 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-600 pb-4">
            <Sparkles className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">💡 핵심 요약 & 마무리</h2>
          </div>

          <div className="space-y-5">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed break-keep">
              수십억을 호가하는 칠흑 노작을 억지로 구하거나, 무리하게 22성 도박을 할 필요가 없습니다.
              아래 4단계만 충실히 따라가도 하드 메이린 130% 컷은 달성할 수 있습니다.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { num: '01', color: 'border-amber-500/40 bg-amber-900/20', numColor: 'text-amber-400', emoji: '💎', title: '잠재능력 21%이상 깡통 구매', desc: '잠재가 완성된 저렴한 깡통을 경매장에서 구입하는 것이 압도적으로 효율적입니다. (샤타포스 때에는 비쌀 수 있어서 경매장 시세 확인 필수!)' },
                { num: '02', color: 'border-emerald-500/40 bg-emerald-900/20', numColor: 'text-emerald-400', emoji: '⭐', title: '할인받아 안전하게 17성 둘둘', desc: '샤타포스 비용 30% 할인 + 파괴 30% 감소. 강화권 5개 활용으로 절반은 무료.' },
                { num: '03', color: 'border-amber-500/40 bg-amber-900/20', numColor: 'text-amber-400', emoji: '🛡️', title: '가성비 18성 베이스 구축', desc: '여명셋 중 1개·도미·하트는 18성 타협. 이 단계만으로 하드 메이린 트라이 가능.' },
                { num: '04', color: 'border-cyan-500/40 bg-cyan-900/20', numColor: 'text-cyan-400', emoji: '🔄', title: '여명/보장 위주 21성 순환 등반', desc: '한 아이템 집중이 아닌 전 부위 순환 강화. 22성 도박 없이 130% 컷 달성.' },
              ].map(({ num, color, numColor, emoji, title, desc }) => (
                <div key={num} className={`border rounded-xl p-4 ${color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-mono font-black text-lg ${numColor}`}>{num}</span>
                    <span className="text-xl">{emoji}</span>
                    <span className="font-bold text-white text-sm">{title}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* 최종 멘트 */}
            <div className="bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-600/40 rounded-xl p-5 text-center">
              <p className="text-2xl mb-2">☀️</p>
              <p className="text-cyan-300 font-black text-base mb-2">7월 5일 썬데이 메이플, 알뜰하게 강화하세요!</p>
              <p className="text-slate-300 text-sm">뇌절 금지 · 스페어 필수 · 잠재능력 먼저 · 순환 강화</p>
            </div>
          </div>
        </section>

        {/* 하단 네비게이션 */}
        <div className="flex justify-center mt-12">
          <Link prefetch={false}
            href="/blog"
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold rounded-xl border border-slate-600 hover:border-amber-500/50 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로 돌아가기
          </Link>
        </div>

      </main>
    </div>
  );
}
