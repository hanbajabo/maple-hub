'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, BookOpen, ShoppingBag, AlertCircle, ShieldAlert, Swords, Coins, Activity, BarChart, Settings, Leaf, Timer, Smartphone } from 'lucide-react';

export default function June18OfficialUpdatePage() {
  const cashItems = [
    { title: '금손 어워즈 의상 세트', date: '2026.06.18 ~ 2026.07.22', image: '/images/june-18/cashshop_2.jpg' },
    { title: '금손 어워즈 펫 세트', date: '2026.06.18 ~ 2026.07.22', image: '/images/june-18/cashshop_4_v2.png' },
    { title: '금손 은손 헤어 & 성형외과 쿠폰', date: '2026.06.18 ~ 2026.07.22', image: '/images/june-18/cashshop_3.png' },
    { title: '위습의 원더베리 & 루나 크리스탈', date: '상시판매', image: '/images/june-18/cashshop_8_v2.png' },
    { title: '스페셜 루나 크리스탈', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_11.png' },
    { title: '프리미엄 헤어 & 성형 쿠폰', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_5.png' },
    { title: '블레어 살롱 헤어 쿠폰', date: '2026.06.18 ~ 2026.07.22', image: '/images/june-18/cashshop_9.png' },
    { title: '로얄스타일 & 마스터피스', date: '상시판매', image: '/images/june-18/cashshop_12.png' },
    { title: '전 직업 일러스트 컬렉션 헤어 쿠폰', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_1_v2.png' },
    { title: '전 직업 헤어 & 성형 쿠폰', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_6.png' },
    { title: '전 직업 일러스트 컬렉션 : 모험가', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_1.png' },
    { title: '전 직업 일러스트 컬렉션 : 시그너스 & 영웅', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_7.png' },
    { title: '전 직업 일러스트 컬렉션 : 데몬 & 레지스탕스', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_13.png' },
    { title: '전 직업 일러스트 컬렉션 : 노바 & 레프', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_10.png' },
    { title: '전 직업 일러스트 컬렉션 : 제로 & 키네시스 & 아니마', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_15_v2.png' },
    { title: '메이플스토리 보스 컬렉션', date: '2026.06.18 ~ 2026.09.16', image: '/images/june-18/cashshop_4.png' },
  ];

  return (
    <div className="min-h-screen bg-[#080711] text-slate-100 pb-24 font-sans leading-relaxed">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-900/5 rounded-full blur-[100px] pointer-events-none z-0" />

      <header className="w-full max-w-7xl flex justify-between items-center px-6 py-4 sticky top-0 z-50 bg-[#080711]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
        <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400 font-semibold group">
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
          <span>블로그 홈으로</span>
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* 타이틀 */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-pink-500/10 text-pink-300 border border-pink-500/30 rounded-full">
              <Calendar className="w-3.5 h-3.5" /> 2026년 6월 18일
            </span>
            <span className="px-3.5 py-1 text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded-full">🌟 본섭 업데이트</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight break-keep">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              6월 18일 본섭 오면서 추가된 사항들 정리
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-pink-500 pl-5 py-2 bg-pink-950/10 rounded-r-lg">
            이번 6월 18일 패치로 본섭에 다양하게 추가된 사항들을 파트별로 정리했습니다. 가장 먼저 만나볼 파트는 코디 유저분들을 설레게 할 <span className="text-white font-bold">캐시아이템 업데이트</span>입니다.
          </p>

          {/* 목차 */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
            <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" /> 📑 목차
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-pink-500/30 transition-colors">
                <span className="text-pink-400 font-mono font-bold">01</span>
                <a href="#cash-update" className="text-slate-300 hover:text-white transition-colors">캐시아이템 업데이트 내역</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-amber-500/30 transition-colors">
                <span className="text-amber-400 font-mono font-bold">02</span>
                <a href="#auction-notice" className="text-slate-300 hover:text-white transition-colors">메이플 옥션 개편 미반영 안내</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-red-500/30 transition-colors">
                <span className="text-red-400 font-mono font-bold">03</span>
                <a href="#union-meso" className="text-slate-300 hover:text-white transition-colors">유니온 메소박스 구매 제한 강화</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-purple-500/30 transition-colors">
                <span className="text-purple-400 font-mono font-bold">04</span>
                <a href="#skill-ban" className="text-slate-300 hover:text-white transition-colors">특정 스킬 보스/무릉 사용 금지</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-emerald-500/30 transition-colors">
                <span className="text-emerald-400 font-mono font-bold">05</span>
                <a href="#sol-erda" className="text-slate-300 hover:text-white transition-colors">캐시샵 '솔 에르다' 직접 판매</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-blue-500/30 transition-colors">
                <span className="text-blue-400 font-mono font-bold">06</span>
                <a href="#monster-park" className="text-slate-300 hover:text-white transition-colors">몬스터파크 주간 퀘스트 완화</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-cyan-500/30 transition-colors">
                <span className="text-cyan-400 font-mono font-bold">07</span>
                <a href="#open-api" className="text-slate-300 hover:text-white transition-colors">신규 스케줄러 Open API 도입</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-slate-400/30 transition-colors">
                <span className="text-slate-400 font-mono font-bold">08</span>
                <a href="#bug-fixes" className="text-slate-300 hover:text-white transition-colors">기타 편의성 및 버그 수정</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-rose-500/30 transition-colors">
                <span className="text-rose-400 font-mono font-bold">09</span>
                <a href="#strawberry-farm" className="text-slate-300 hover:text-white transition-colors">황금 딸기 농장 버프 유지</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-orange-500/30 transition-colors">
                <span className="text-orange-400 font-mono font-bold">10</span>
                <a href="#specter-blast" className="text-slate-300 hover:text-white transition-colors">스펙터 블래스트 훈장컷 변경</a>
              </li>
              <li className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-indigo-500/30 transition-colors">
                <span className="text-indigo-400 font-mono font-bold">11</span>
                <a href="#monster-park-hands" className="text-slate-300 hover:text-white transition-colors">몬스터파크 핸즈 오픈</a>
              </li>
            </ol>
          </div>
        </div>

        {/* 1. 캐시아이템 업데이트 */}
        <section id="cash-update" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <ShoppingBag className="w-6 h-6 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 🛍️ 6월 18일 캐시아이템 업데이트 총정리</h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>이번 업데이트에서는 전 직업 일러스트 컬렉션부터 금손 어워즈 아이템까지 역대급 라인업의 캐시아이템이 추가되었습니다. 원하시는 품목의 판매 기간을 잘 확인해 보세요!</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cashItems.map((item, index) => (
                <div key={index} className="bg-slate-950/60 border border-slate-800 hover:border-pink-500/30 transition-colors rounded-xl p-4 flex flex-col">
                  <p className="font-bold text-white mb-3 text-base">{item.title}</p>
                  {item.image && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-slate-800/50 flex-shrink-0 flex items-center justify-center bg-black/20 p-2">
                      <img src={item.image} alt={item.title} className="max-w-full h-auto object-contain max-h-40 rounded-md" />
                    </div>
                  )}
                  <p className="text-pink-300 text-xs sm:text-sm font-mono bg-pink-950/30 py-1.5 px-3 rounded-md w-fit border border-pink-900/50 mt-auto">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 옥션 지연 안내 */}
        <section id="auction-notice" className="mb-14 scroll-mt-24 bg-amber-900/10 border border-amber-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-amber-800/30 pb-4">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. ⚠️ 6/18(목) 메이플 옥션 개편 사항 미반영 안내</h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>안녕하세요. 메이플스토리입니다.</p>
            <p>6/18(목) 업데이트로 반영 예정이었던 신규 버전의 메이플 옥션 작업에 문제가 확인되어, <strong>6/18(목) 업데이트 시점에는 기존 메이플 옥션이 유지</strong>될 예정입니다.</p>
            
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 my-4">
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>기존 메이플 옥션이 유지됨에 따라, 신규 기능인 <span className="text-amber-300">인게임 UI 및 웹 브라우저 기능</span> 등은 사용이 불가능합니다.</li>
                <li>단, OVERDRIVE 쇼케이스에서 안내드린 <strong className="text-white">챌린저스 월드의 월드 통합 메이플 옥션</strong>은 정상적으로 이용이 가능합니다.</li>
              </ul>
            </div>

            <p>신규 버전의 메이플 옥션은 문제가 수정 되는대로 별도 공지를 통해 오픈 안내를 드릴 예정입니다.</p>
            <p>더욱 안정적인 서비스 제공을 위해 최선을 다하겠습니다.</p>
          </div>
        </section>

        {/* 3. 유니온 메소박스 */}
        <section id="union-meso" className="mb-14 scroll-mt-24 bg-red-900/10 border border-red-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-red-800/30 pb-4">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 💰 유니온 메소박스 구매 제한 강화 (가장 중요!)</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p><span className="inline-block px-2 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded mr-2">본섭 추가</span>다계정 악용(챌린저스 월드 티어 보상 악용)을 막기 위해 하급/중급/상급 유니온 메소박스의 구매 제한이 <strong>'메이플 ID 단위'</strong>로 변경되었습니다.</p>
            <p>테섭 공지에는 없던 내용이며, 개발자 코멘트까지 덧붙여 강하게 제재가 들어갔습니다.</p>
          </div>
        </section>

        {/* 4. 스킬/펫 금지 */}
        <section id="skill-ban" className="mb-14 scroll-mt-24 bg-purple-900/10 border border-purple-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-purple-800/30 pb-4">
            <Swords className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. ⚔️ 특정 스킬 및 펫 기능 보스/무릉 사용 금지</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-purple-300 mb-2">에르다 샤워 (공통 스킬)</h3>
              <p>본섭으로 넘어오면서 보스 전투맵, 무릉도장, 샤레니안의 지하수로에서 사용할 수 없도록 너프 되었습니다.</p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-purple-300 mb-2">루나 게더링 (신규 루나 쁘띠 스킬)</h3>
              <p>맵의 모든 아이템을 줍는 이 사기적인 스킬 역시 본섭에선 보스 전투맵, 무릉도장, 샤레니안의 지하수로에서 사용 불가 제약이 추가되었습니다.</p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <h3 className="font-bold text-purple-300 mb-2">기타 스킬 조정</h3>
              <p>본섭 공지에 '솔 야누스 : 새벽/황혼' 스킬 설명 변경과 '회춘신공'의 공/마 증가량 하향(25% → 16%)이 추가되었습니다.</p>
            </div>
          </div>
        </section>

        {/* 5. 솔 에르다 판매 */}
        <section id="sol-erda" className="mb-14 scroll-mt-24 bg-emerald-900/10 border border-emerald-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-emerald-800/30 pb-4">
            <Coins className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. 🛍️ 캐시샵 '솔 에르다' 직접 판매 추가</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p><span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded mr-2">본섭 추가</span>테섭에는 없던 내용인데, 본섭 캐시샵 목록 맨 위에 <strong>'솔 에르다(5개)' 상품을 10,000 캐시에 판매</strong>(메이플 ID당 4회 제한)한다는 내용이 추가되었습니다.</p>
          </div>
        </section>

        {/* 6. 몬파 주간퀘 완화 */}
        <section id="monster-park" className="mb-14 scroll-mt-24 bg-blue-900/10 border border-blue-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-blue-800/30 pb-4">
            <Activity className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. 🎢 몬스터파크 주간 퀘스트 조건 완화</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-slate-400">테섭:</strong> 260레벨 이상 + '[6차] 새로운 힘' 퀘스트를 완료한 캐릭터만 시작 가능.</li>
              <li><strong className="text-blue-300">본섭:</strong> 6차 전직 조건이 삭제되고 <strong>'260레벨 이상 캐릭터만'</strong> 시작할 수 있도록 허들이 낮아졌습니다.</li>
            </ul>
          </div>
        </section>

        {/* 7. Open API */}
        <section id="open-api" className="mb-14 scroll-mt-24 bg-cyan-900/10 border border-cyan-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-cyan-800/30 pb-4">
            <BarChart className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">7. 📊 신규 '스케줄러 Open API' 도입</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p><span className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded mr-2">본섭 추가</span>캐릭터의 일일/주간 컨텐츠 달성 현황을 외부에서도 실시간으로 확인할 수 있는 <strong>스케줄러 Open API 기능이 6월 25일부터 도입</strong>된다는 내용이 본섭 공지에 통째로 신설되었습니다. 이와 연동된 Open API 개선/오류 수정 항목들도 대거 추가되었습니다.</p>
          </div>
        </section>

        {/* 8. 기타 편의성 */}
        <section id="bug-fixes" className="mb-14 scroll-mt-24 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <Settings className="w-6 h-6 text-slate-300" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">8. 🛠️ 기타 편의성 및 버그 수정 (본섭 추가분)</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
              <h3 className="font-bold text-white mb-2">아스트라 보조무기</h3>
              <p>흔적 아이템을 버릴 수 있게 되었고, 에레브의 나인하트를 통해 관련 퀘스트를 초기화할 수 있게 개선되었습니다.</p>
            </div>
          </div>
        </section>

        {/* 9. 황금 딸기 농장 */}
        <section id="strawberry-farm" className="mb-14 scroll-mt-24 bg-rose-900/10 border border-rose-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-rose-800/30 pb-4">
            <Leaf className="w-6 h-6 text-rose-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">9. 🍓 황금 딸기 농장 개선</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>이번 본섭 업데이트로 <strong>황금 딸기 농장</strong> 시스템이 대폭 개편되었습니다.</p>
            <ul className="list-disc list-inside space-y-2 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <li><strong>경험치 효과 미적용:</strong> 농장 내에서는 어떠한 추가 경험치 효과도 적용되지 않도록 변경됩니다. (딸기의 가호 버프에서 경험치 400% 증가 효과 제거)</li>
              <li><strong>버프 유지:</strong> 테스트 서버와 달리, 농장 입장 시 캐릭터의 기존 버프가 해제되지 않도록 수정되었습니다.</li>
              <li><strong>몬스터 추격:</strong> 황금 딸기 몬스터들이 캐릭터를 추격하도록 AI가 변경되었습니다.</li>
              <li>일부 소비 아이템 사용 가능 및 콤보킬/멀티킬 미발생 처리 등</li>
            </ul>
            <div className="p-4 bg-rose-900/20 border border-rose-800/40 rounded-xl mt-4">
              <p className="text-rose-300 font-medium">💡 작성자 코멘트</p>
              <p className="text-slate-300 mt-1">이제 황금 딸기 농장에서 어떠한 추가 경험치 효과도 적용되지 않도록 변경되면서, 홀리 심볼이나 정령의 펜던트 같은 추가 경험치 버프를 굳이 신경 쓰지 않아도 되게 편해졌네요!</p>
            </div>
          </div>
        </section>

        {/* 10. 스펙터 블래스트 */}
        <section id="specter-blast" className="mb-14 scroll-mt-24 bg-orange-900/10 border border-orange-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-orange-800/30 pb-4">
            <Timer className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">10. ⏳ [난이도 대폭 상승] '스펙터 블래스트' 훈장컷 타임어택</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>유저들의 미니게임 클리어 속도가 예상보다 빨랐는지, 히든 보상(물 만난 거북이 훈장)의 클리어 타임 조건이 엄청나게 빡빡해졌습니다.</p>
            <ul className="list-disc list-inside space-y-2 bg-slate-950/40 border border-slate-800 rounded-xl p-4">
              <li><strong className="text-slate-400">테스트 서버:</strong> 465초 (7분 45초) 이내 클리어</li>
              <li><strong className="text-orange-300">본 서버:</strong> 390초 (6분 30초) 이내 클리어</li>
            </ul>
            <p className="text-orange-200 font-semibold border-l-4 border-orange-500 pl-3">결과: 무려 75초나 단축되었습니다. 본섭에서는 파티원과 합을 아주 잘 맞춰야만 훈장을 얻을 수 있게 되었습니다.</p>
          </div>
        </section>

        {/* 11. 몬스터파크 핸즈 */}
        <section id="monster-park-hands" className="mb-14 scroll-mt-24 bg-indigo-900/10 border border-indigo-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-indigo-800/30 pb-4">
            <Smartphone className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">11. 📱 [신규 컨텐츠 추가] '몬스터파크 핸즈' 오픈</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">

            
            <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 my-4 space-y-3">
              <p><strong>내용:</strong> 공식 모바일 앱인 '메이플핸즈+'를 통해 접속하지 않은 오프라인 상태에서도 몬스터파크 사냥을 돌릴 수 있는 엄청난 편의성 기능입니다.</p>
              <p><strong>보상:</strong> 경험치는 물론 코어 젬스톤, 지역별 어센틱 심볼, 심지어 <strong>솔 에르다의 기운/조각</strong>까지 앱으로 파밍할 수 있습니다. <br/><span className="text-sm text-indigo-300">(MVP 골드 이상은 매주 2시간의 추가 이용 시간 제공)</span></p>
            </div>
          </div>
        </section>
        {/* 12. 기타 편의성 개선 */}
        <section id="other-improvements" className="mb-14 scroll-mt-24 bg-slate-900/40 border border-slate-700/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">12. 🛠️ 기타 편의성 개선 및 변경사항</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <ul className="list-disc list-inside space-y-3 bg-slate-950/60 border border-slate-800 rounded-xl p-5">
              <li><strong>솔 에르다 / 솔 에르다 조각 선택권</strong>을 한 번에 최대 300개까지 사용할 수 있도록 변경됩니다.</li>
              <li><strong>VIP 부스터</strong>의 일일 사용 제한 횟수가 삭제됩니다.</li>
              <li><strong>훈장 재발급 비용</strong>이 삭제됩니다.</li>
              <li>유효 기간이 존재하는 훈장에 <strong>재발급 불가 메세지</strong>가 추가됩니다.</li>
            </ul>
          </div>
        </section>

        {/* 13. 레테 스킬 개편 */}
        <section id="lethe-skills" className="mb-14 scroll-mt-24 bg-purple-900/10 border border-purple-800/40 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3 mb-6 border-b border-purple-800/30 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">13. 🔮 신직업 '레테' 스킬 대폭 개편</h2>
          </div>
          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed break-keep">
            <p>본섭에 넘어오면서 레테의 스킬 구조가 완전히 환골탈태했습니다. <strong>꿀잼 스킬 난사형 직업</strong>으로 재탄생했으니 꼭 확인해 보세요!</p>
            <ul className="list-disc list-inside space-y-3 bg-slate-950/40 border border-slate-800 rounded-xl p-5">
              <li><strong>구조적 족쇄 해방:</strong> 오리진 스킬 선사용 강제가 삭제되었고, 소환수 스킬을 정해진 순서대로 써야 했던 불합리한 맹약 시스템이 '아무 스킬이나 3회 사용'으로 정상화되었습니다.</li>
              <li><strong>미친 회전율 (이딕트 쿨감):</strong> 핵심 스킬인 이딕트의 기본 쿨타임이 30초에서 20초로 대폭 감소했으며, 극딜 타임(30초) 동안에는 쿨타임이 40% 추가 감소합니다.</li>
              <li><strong>소환수 AI 및 편의성:</strong> 소환수의 기본 평딜은 하향되었지만, 몬스터를 끝까지 추적해 사냥하는 신규 온오프 스킬 <strong>'스캐터'</strong>가 추가되어 사냥 피로도가 대폭 낮아졌습니다.</li>
            </ul>
            <a href="/blog/lethe-skill-patch-notes" className="inline-block mt-4 px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-600/40 transition-colors">
              👉 레테 스킬 변경점 총정리 자세히 보기
            </a>
          </div>
        </section>


        {/* 해시태그 */}
        <div className="flex flex-wrap gap-2 mt-8 mb-6 px-2">
          {['#메이플스토리', '#캐시아이템', '#일러스트컬렉션', '#금손어워즈', '#로얄스타일', '#루나크리스탈', '#메이플본섭'].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-slate-800/40 text-slate-300 text-sm rounded-full border border-slate-700/50 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* 블로그 목록으로 돌아가기 버튼 */}
        <div className="flex justify-center mt-12 border-t border-slate-800/60 pt-8">
          <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700/50 hover:border-pink-500/50 transition-all font-semibold">
            <ArrowLeft className="w-4 h-4" />
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
