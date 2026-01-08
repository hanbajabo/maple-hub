'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, TrendingUp, TrendingDown, AlertCircle, Plus, ArrowLeft, Search, X } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldSkillBalancePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const jobs = [
        '히어로', '팔라딘', '다크나이트',
        '아크메이지(불,독)', '아크메이지(썬,콜)', '비숍',
        '보우마스터', '신궁',
        '나이트로드', '섀도어', '듀얼블레이드',
        '바이퍼', '캡틴', '캐논슈터',
        '미하일', '소울마스터', '플레임위자드', '윈드브레이커', '나이트워커', '스트라이커',
        '아란', '에반', '루미너스', '메르세데스', '팬텀', '은월',
        '데몬 슬레이어', '블래스터', '와일드헌터', '제논', '메카닉',
        '카이저', '카데나', '엔젤릭버스터',
        '제로', '키네시스',
        '아델', '일리움', '칼리', '아크',
        '라라', '렌', '호영'
    ];

    const filteredJobs = searchQuery
        ? jobs.filter(job => job.toLowerCase().includes(searchQuery.toLowerCase()))
        : [];

    const scrollToJob = (job: string) => {
        const element = document.getElementById(job);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setSearchQuery('');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <header className="w-full sm:max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <span className="text-slate-400">2026년 1월 8일</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-tight">
                        ⚔️ 테스트월드 클라이언트 1.2.197 릴리즈 - 스킬 조정 총정리
                    </h1>

                    <p className="text-lg text-slate-300 mb-6">
                        2026년 1월 15일 본섭 적용 예정! 전 직업 스킬 밸런스 패치를 상세하게 분석했습니다.
                    </p>

                    {/* Update Schedule */}
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-6 mb-8">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-purple-400" />
                            업데이트 일정
                        </h3>
                        <div className="space-y-2 text-slate-200">
                            <p>• <span className="font-bold text-purple-300">테스트월드</span>: 2026년 1월 8일 (목)</p>
                            <p>• <span className="font-bold text-pink-300">본서버 적용 예정</span>: 2026년 1월 15일 (목)</p>
                        </div>
                    </div>
                </div>

                {/* Common Skills */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-purple-400">🌟 공통</h2>

                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-2 border-slate-700 rounded-2xl p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-lg mb-2">리스트레인트 링</h3>
                                <p className="text-slate-300 text-sm">• 시전 시 바로 효과가 적용되도록 수정</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg mb-2">베놈 버스트</h3>
                                <p className="text-slate-300 text-sm">• 타격 이펙트가 출력되는 시간 수정</p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Search Section */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Search className="w-6 h-6 text-purple-400" />
                            <h2 className="text-2xl font-bold text-purple-400">직업 검색</h2>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="직업명을 입력하세요 (예: 히어로, 비숍, 아크)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 pr-12 bg-slate-900/50 border-2 border-purple-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        {filteredJobs.length > 0 && (
                            <div className="mt-4 bg-slate-900/50 border border-purple-500/30 rounded-lg p-4 max-h-60 overflow-y-auto">
                                <p className="text-sm text-slate-400 mb-2">검색 결과 ({filteredJobs.length}개)</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {filteredJobs.map((job) => (
                                        <button
                                            key={job}
                                            onClick={() => scrollToJob(job)}
                                            className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 rounded-lg text-sm text-white transition-colors text-left"
                                        >
                                            {job}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {searchQuery && filteredJobs.length === 0 && (
                            <p className="text-sm text-red-400 mt-2">
                                "{searchQuery}"에 대한 검색 결과가 없습니다.
                            </p>
                        )}
                    </div>
                </section>

                {/* Hero */}
                <section id="히어로" className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/히어로.png" alt="히어로" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-red-400">히어로</h2>
                        </div>

                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">레이징 블로우 🔼</span>: 강화 데미지 <span className="text-red-400">344%</span> → <span className="text-green-400">387%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">레이징 블로우 VI 🔼</span>: 강화 데미지 <span className="text-red-400">700%</span> → <span className="text-green-400">721%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">레이징 업라이징 VI 🔼</span>: 레이징 블로우 VI 데미지 증가 <span className="text-red-400">148%p</span> → <span className="text-green-400">157%p</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">파이널 어택 VI 🔼</span>: 데미지 <span className="text-red-400">266%</span> → <span className="text-green-400">276%</span></p>
                        </div>
                    </div>
                </section>

                {/* Paladin */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-white/10 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/팔라딘.png" alt="팔라딘" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-blue-400">팔라딘</h2>
                        </div>

                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">팔라딘 엑스퍼트 🔽</span>: 최종 데미지 <span className="text-green-400">40%</span> → <span className="text-red-400">35%</span>, 크리티컬 데미지 <span className="text-green-400">20%</span> → <span className="text-red-400">17%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">디바인 저지먼트 🔽</span>: 신성 낙인 폭발 <span className="text-green-400">700%</span> → <span className="text-red-400">622%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">디바인 저지먼트 VI 🔽</span>: 신성 낙인 폭발 <span className="text-green-400">1160%</span> → <span className="text-red-400">1009%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">생츄어리 VI 🔽</span>: 디바인 저지먼트 VI 데미지 증가 <span className="text-green-400">410%p</span> → <span className="text-red-400">357%p</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">도미누스 오브리온 🔼</span>: 충격 <span className="text-red-400">9963%</span> → <span className="text-green-400">10924%</span>, 빛의 심판 <span className="text-red-400">10368%</span> → <span className="text-green-400">10908%</span></p>
                            <p className="text-slate-300 text-sm">• 마이티 묠니르: 타격 이펙트 위치 수정</p>
                        </div>
                    </div>
                </section>

                {/* Dark Knight */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/다크나이트.png" alt="다크나이트" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">다크나이트</h2>
                        </div>

                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">리인카네이션 액셉트 ✨ 신규!</span>: 아래 방향키로 리인카네이션 알터 선택 가능</p>
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">리인카네이션 알터 ✨ 신규!</span>: 원하는 타이밍에 수동으로 리인카네이션 발동 가능</p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">피어스 사이클론 🔼</span>: 데미지 <span className="text-red-400">530%</span> → <span className="text-green-400">583%</span>, 마무리 공격 <span className="text-red-400">1140%</span> → <span className="text-green-400">1254%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">다크 신서시스 VI 🔼</span>: 데미지 <span className="text-red-400">750%</span> → <span className="text-green-400">775%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">비홀더 쇼크 VI 🔼</span>: 데미지 <span className="text-red-400">1280%</span> → <span className="text-green-400">1344%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Fire/Poison Mage */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/아크메이지(불,독).png" alt="아크메이지(불,독)" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-orange-400">아크메이지(불,독)</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">익스트림 매직(불,독) 🔼</span>: 상태이상 적 공격 시 최종 데미지 <span className="text-red-400">13%</span> → <span className="text-green-400">15%</span></p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-green-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
                                    <span className="font-semibold">메기도 플레임 VI 🔼</span>
                                </div>
                                <p className="text-sm ml-6">• 불꽃: <span className="text-red-400">630%</span> → <span className="text-green-400">688%</span></p>
                                <p className="text-sm ml-6">• 도트: <span className="text-red-400">980%</span> → <span className="text-green-400">1038%</span></p>
                                <p className="text-sm ml-6">• 폭발 모드 폭발: <span className="text-red-400">470%</span> → <span className="text-green-400">528%</span></p>
                            </div>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">메테오 VI 🔼</span>: 데미지 <span className="text-red-400">700%</span> → <span className="text-green-400">758%</span>, 패시브 증가 <span className="text-red-400">383%p</span> → <span className="text-green-400">441%p</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">토렌셜 플레임 🔼</span>: 데미지 <span className="text-red-400">3885%</span> → <span className="text-green-400">3920%</span></p>
                        </div>
                    </div>
                </section>

                {/* Ice/Lightning Mage */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/아크메이지(썬,콜).png" alt="아크메이지(썬,콜)" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-cyan-400">아크메이지(썬,콜)</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">스펠 마스터리 🔼</span>: 마력 증가 <span className="text-red-400">10</span> → <span className="text-green-400">30</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">익스트림 매직(썬,콜) 🔼</span>: 상태이상 적 공격 시 최종 데미지 <span className="text-red-400">18%</span> → <span className="text-green-400">20%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">매직 크리티컬 🔼</span>: 크리티컬 데미지 <span className="text-red-400">13%</span> → <span className="text-green-400">15%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">파라볼릭 볼트 🔽</span>: 전류 방출 <span className="text-green-400">4760%</span> → <span className="text-red-400">4712%</span>, 신속의 번개 <span className="text-green-400">2100%</span> → <span className="text-red-400">2079%</span></p>
                        </div>
                    </div>
                </section>

                {/* Continue with all other classes... Due to length, I'll create a comprehensive version */}

                {/* Bishop */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-white/10 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/비숍.png" alt="비숍" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-yellow-400">비숍</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">트라이엄프 페더 VI 🔼</span>: 데미지 <span className="text-red-400">570%</span> → <span className="text-green-400">684%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">제네시스 VI 🔼</span>: 데미지 <span className="text-red-400">825%</span> → <span className="text-green-400">990%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">커맨드 오브 헤븐 🔼</span>: 빛의 데미지 <span className="text-red-400">3770%</span> → <span className="text-green-400">3996%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Bowmaster */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/보우마스터.png" alt="보우마스터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-green-400">보우마스터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">아머 피어싱 🔼</span>: 최종 데미지 <span className="text-red-400">13%</span> → <span className="text-green-400">16%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">언카운터블 애로우 VI 🔼</span>: 어드밴스드 파이널 어택 데미지 증가 <span className="text-red-400">320%p</span> → <span className="text-green-400">378%p</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">포인트 제로 🔽</span>: 화살 충격 <span className="text-green-400">7910%</span> → <span className="text-red-400">7590%</span>, 일점 폭발 <span className="text-green-400">8260%</span> → <span className="text-red-400">7905%</span></p>
                        </div>
                    </div>
                </section>

                {/* Marksman */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-slate-700/30 to-blue-900/30 border-2 border-slate-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/신궁.png" alt="신궁" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-slate-300">신궁</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">마크맨쉽 🔼</span>: 데미지 증가 <span className="text-red-400">15%</span> → <span className="text-green-400">21%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">크로스보우 엑스퍼트 🔼</span>: 공격력 증가 <span className="text-red-400">30</span> → <span className="text-green-400">40</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">라스트맨 스탠딩 🔼</span>: 최종 데미지 <span className="text-red-400">10%</span> → <span className="text-green-400">13%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">차지드 애로우 🔼</span>: 데미지 <span className="text-red-400">1870%</span> → <span className="text-green-400">1925%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">페이탈 트리거 🔽</span>: 파열 <span className="text-green-400">8353%</span> → <span className="text-red-400">7953%</span>, 일격 <span className="text-green-400">8543%</span> → <span className="text-red-400">8134%</span></p>
                        </div>
                    </div>
                </section>

                {/* Night Lord */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/나이트로드.png" alt="나이트로드" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">나이트로드</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">다크 세레니티 🔼</span>: 최종 데미지 <span className="text-red-400">14%</span> → <span className="text-green-400">15%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">크루셜 어썰트 🔽</span>: 파동 <span className="text-green-400">7429%</span> → <span className="text-red-400">7325%</span>, 폭발 <span className="text-green-400">8283%</span> → <span className="text-red-400">8167%</span></p>
                        </div>
                    </div>
                </section>

                {/* Shadower */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-gray-900/30 to-slate-900/30 border-2 border-gray-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/섀도어.png" alt="섀도어" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-gray-300">섀도어</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">대거 마스터리 🔼</span>: 최종 데미지 <span className="text-red-400">6%</span> → <span className="text-green-400">9%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">실드 마스터리 🔼</span>: 공격력 <span className="text-red-400">15</span> → <span className="text-green-400">20</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">크리티컬 엣지 🔼</span>: 크리티컬 데미지 <span className="text-red-400">4%</span> → <span className="text-green-400">5%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">플립 더 코인 🔼</span>: 데미지 증가 <span className="text-red-400">20%</span> → <span className="text-green-400">24%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">어센틱 다크니스 🔽</span>: 참격 <span className="text-green-400">7606%</span> → <span className="text-red-400">7165%</span>, 폭발 <span className="text-green-400">8821%</span> → <span className="text-red-400">8295%</span></p>
                        </div>
                    </div>
                </section>

                {/* Dual Blade */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 to-black/30 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/듀얼블레이더.png" alt="듀얼블레이드" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-red-400">듀얼블레이드</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">섀도우 이베이젼 🔼</span>: 최종 데미지 <span className="text-red-400">7%</span> → <span className="text-green-400">8%</span></p>
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">섀도우 이베이젼 ✨ 신규!</span>: 크리티컬 데미지 5% 증가 기능 추가</p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">야마즈 디크리 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 힘의 해방: <span className="text-green-400">6020%</span> → <span className="text-red-400">5779%</span></p>
                                <p className="text-sm ml-6">• 참격: <span className="text-green-400">7840%</span> → <span className="text-red-400">7683%</span></p>
                                <p className="text-sm ml-6">• 필연의 심판: <span className="text-green-400">10710%</span> → <span className="text-red-400">10495%</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Viper */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/바이퍼.png" alt="바이퍼" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-yellow-400">바이퍼</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="text-slate-300 text-sm">• 서펜트 스크류: 에픽 던전 악몽선경 이펙트 출력 수정</p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">피스트 인레이지 VI 🔼</span>: 데미지 <span className="text-red-400">420%</span> → <span className="text-green-400">450%</span></p>
                        </div>
                    </div>
                </section>

                {/* Captain */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/캡틴.png" alt="캡틴" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-blue-400">캡틴</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">노틸러스 어썰트 🔼</span>: 선체 공격 <span className="text-red-400">1630%</span> → <span className="text-green-400">1776%</span>, 일제 사격 <span className="text-red-400">600%</span> → <span className="text-green-400">654%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">데스 트리거 🔼</span>: 데미지 <span className="text-red-400">520%</span> → <span className="text-green-400">580%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">파이어크래커 🔽</span>: 공중사격 <span className="text-green-400">6191%</span> → <span className="text-red-400">6159%</span>, 탄폭 <span className="text-green-400">6191%</span> → <span className="text-red-400">6159%</span></p>
                        </div>
                    </div>
                </section>

                {/* Cannon Shooter */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/캐논마스터.png" alt="캐논슈터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-orange-400">캐논슈터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">오버버닝 캐논 🔼</span>: 최종 데미지 <span className="text-red-400">30%</span> → <span className="text-green-400">32%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">미니 캐논볼 VI 🔼</span>: 데미지 <span className="text-red-400">1680%</span> → <span className="text-green-400">1738%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">배럴 오브 몽키스 🔽</span>: 여폭 <span className="text-green-400">5950%</span> → <span className="text-red-400">5810%</span>, 산개 폭격 <span className="text-green-400">6230%</span> → <span className="text-red-400">6090%</span></p>
                        </div>
                    </div>
                </section>

                {/* Continue with remaining jobs... */}

                {/* Mihile */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-white/20 to-blue-900/30 border-2 border-white/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/미하일.png" alt="미하일" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-white">미하일</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">소울 레이지 🔼</span>: 최종 데미지 <span className="text-red-400">23%</span> → <span className="text-green-400">25%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">어드밴스드 소드 마스터리 🔼</span>: 크리티컬 데미지 <span className="text-red-400">20%</span> → <span className="text-green-400">22%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">나이트 임모탈스 🔽</span>: 극광 <span className="text-green-400">6827%</span> → <span className="text-red-400">6243%</span></p>
                            <p className="text-slate-300 text-sm">• 나이트 임모탈스: 암흑 효과 적용 오류 수정</p>
                        </div>
                    </div>
                </section>

                {/* Soul Master */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/소울마스터.png" alt="소울마스터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-red-400">소울마스터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">소울 블레싱 III 🔼</span>: 최종 데미지 <span className="text-red-400">16%</span> → <span className="text-green-400">17%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">토탈리티 🔽</span>: 합일의 풍압 <span className="text-green-400">5065%</span> → <span className="text-red-400">4942%</span>, 혼참의 맹참 <span className="text-green-400">5726%</span> → <span className="text-red-400">5440%</span></p>
                        </div>
                    </div>
                </section>

                {/* Flame Wizard */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/플레임위자드.png" alt="플레임위자드" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-orange-400">플레임위자드</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">오비탈 플레임 VI 🔼</span>: 데미지 <span className="text-red-400">760%</span> → <span className="text-green-400">768%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Wind Breaker */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/윈드브레이커.png" alt="윈드브레이커" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-green-400">윈드브레이커</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">알바트로스 🔼</span>: 최종 데미지 <span className="text-red-400">9%</span> → <span className="text-green-400">12%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">보우 엑스퍼트 🔼</span>: 크리티컬 데미지 <span className="text-red-400">20%</span> → <span className="text-green-400">21%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">엘리멘트 템페스트 🔽</span>: 파동 <span className="text-green-400">8177%</span> → <span className="text-red-400">8027%</span>, 화살 세례 <span className="text-green-400">8537%</span> → <span className="text-red-400">8204%</span></p>
                        </div>
                    </div>
                </section>

                {/* Night Walker */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-black/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/나이트워커.png" alt="나이트워커" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">나이트워커</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">다크니스 블레싱 🔼</span>: 최종 데미지 <span className="text-red-400">10%</span> → <span className="text-green-400">12%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">래버너스 배트 VI 🔼</span>: 데미지 <span className="text-red-400">980%</span> → <span className="text-green-400">1013%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">스티지언 커맨드 🔽</span>: 칠흑의 장막 <span className="text-green-400">6527%</span> → <span className="text-red-400">6380%</span>, 암흑의 지배 <span className="text-green-400">5811%</span> → <span className="text-red-400">5680%</span></p>
                        </div>
                    </div>
                </section>

                {/* Striker */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/스트라이커.png" alt="스트라이커" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-cyan-400">스트라이커</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">너클 엑스퍼트 🔼</span>: 최종 데미지 <span className="text-red-400">17%</span> → <span className="text-green-400">18%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">질도섬멸 🔽</span>: 맹공 <span className="text-green-400">6240%</span> → <span className="text-red-400">6160%</span>, 격류 <span className="text-green-400">6618%</span> → <span className="text-red-400">6510%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Aran */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/아란.png" alt="아란" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-blue-400">아란</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">하이 마스터리 🔼</span>: 크리티컬 데미지 <span className="text-red-400">7%</span> → <span className="text-green-400">11%</span>, 최종 데미지 <span className="text-red-400">20%</span> → <span className="text-green-400">21%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">아드레날린 맥시멈 VI 🔼</span>: 얼음 폭풍 <span className="text-red-400">1560%</span> → <span className="text-green-400">1705%</span>, 얼음 파동 <span className="text-red-400">897%</span> → <span className="text-green-400">927%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">프로스트 블러스터 🔽</span>: 폭풍 <span className="text-green-400">8892%</span> → <span className="text-red-400">8610%</span>, 빙결참 <span className="text-green-400">8084%</span> → <span className="text-red-400">7805%</span></p>
                        </div>
                    </div>
                </section>

                {/* Evan */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/에반.png" alt="에반" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-cyan-400">에반</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">엘리멘탈 리셋 🔼</span>: 최종 데미지 <span className="text-red-400">17%</span> → <span className="text-green-400">18%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">유니온 드라이브 🔽</span>: 마력 공격 <span className="text-green-400">7737%</span> → <span className="text-red-400">7621%</span>, 공명의 파동 <span className="text-green-400">8424%</span> → <span className="text-red-400">8298%</span></p>
                        </div>
                    </div>
                </section>

                {/* Luminous */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-purple-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/루미너스.png" alt="루미너스" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-yellow-400">루미너스</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">메모라이즈 🔽</span>: 데미지 <span className="text-green-400">1000%</span> → <span className="text-red-400">950%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">리버레이션 오브 🔽</span>: 데미지 <span className="text-green-400">820%</span> → <span className="text-red-400">770%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">앱솔루트 킬 VI 🔽</span>: 데미지 <span className="text-green-400">695%</span> → <span className="text-red-400">675%</span></p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">트와일라잇 노바 VI 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 선파이어: <span className="text-green-400">1630%</span> → <span className="text-red-400">1530%</span></p>
                                <p className="text-sm ml-6">• 이클립스: <span className="text-green-400">1630%</span> → <span className="text-red-400">1530%</span></p>
                                <p className="text-sm ml-6">• 이퀄리브리엄: <span className="text-green-400">1125%</span> → <span className="text-red-400">1055%</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mercedes */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/메르세데스.png" alt="메르세데스" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-green-400">메르세데스</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="text-slate-300 text-sm">• 유니콘 스파이크: 유니콘 스파이크 VI와 재사용 대기시간 공유 오류 수정</p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">이그니스 로어 🔽</span>: 최종 데미지 <span className="text-green-400">20%</span> → <span className="text-red-400">17%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">디펜스 브레이크 🔽</span>: 크리티컬 데미지 <span className="text-green-400">16%</span> → <span className="text-red-400">15%</span></p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">엘리멘탈 고스트 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 잔상 최종 데미지 반영률: <span className="text-green-400">50%</span> → <span className="text-red-400">45%</span></p>
                                <p className="text-sm ml-6">• HEXA 강화 시 반영률: <span className="text-green-400">65%</span> → <span className="text-red-400">60%</span></p>
                            </div>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">엘리멘탈 스피릿 🔼</span>: 데미지 <span className="text-red-400">8610%</span> → <span className="text-green-400">8785%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Phantom */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/팬텀.png" alt="팬텀" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">팬텀</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">케인 엑스퍼트 🔽</span>: 최종 데미지 <span className="text-green-400">32%</span> → <span className="text-red-400">31%</span></p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">블랙잭 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 카드: <span className="text-green-400">1375%</span> → <span className="text-red-400">1210%</span></p>
                                <p className="text-sm ml-6">• 봉인이 풀린 카드: <span className="text-green-400">1815%</span> → <span className="text-red-400">1540%</span></p>
                                <p className="text-sm ml-6">• 해방된 카드: <span className="text-green-400">1430%</span> → <span className="text-red-400">1265%</span></p>
                            </div>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">문리트 세레나데 🔼</span>: 참격 <span className="text-red-400">6445%</span> → <span className="text-green-400">6765%</span></p>
                        </div>
                    </div>
                </section>

                {/* Eunwol */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/은월.png" alt="은월" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-orange-400">은월</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">일치단결 🔼</span>: 크리티컬 데미지 <span className="text-red-400">10%</span> → <span className="text-green-400">14%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">호기서림 🔼</span>: 최종 데미지 <span className="text-red-400">11%</span> → <span className="text-green-400">14%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">환혼요호진 🔼</span>: 여우볕 <span className="text-red-400">385%</span> → <span className="text-green-400">440%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">영월 🔽</span>: 영압 <span className="text-green-400">2419%</span> → <span className="text-red-400">2219%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Demon Slayer */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-red-900/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/데몬슬레이어.png" alt="데몬 슬레이어" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">데몬 슬레이어</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">컨센트레이션 🔼</span>: 최종 데미지 <span className="text-red-400">31%</span> → <span className="text-green-400">32%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">아메시스틴 인트루젼 🔽</span>: 데미지 <span className="text-green-400">10885%</span> → <span className="text-red-400">10815%</span></p>
                        </div>
                    </div>
                </section>

                {/* Blaster */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/블래스터.png" alt="블래스터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-orange-400">블래스터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">건틀렛 마스터리 🔼</span>: 공격력 증가 <span className="text-red-400">20</span> → <span className="text-green-400">28</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">콤비네이션 트레이닝 II 🔼</span>: 최종 데미지 <span className="text-red-400">68%</span> → <span className="text-green-400">70%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">뱅가드 임팩트 🔽</span>: 충격 <span className="text-green-400">3150%</span> → <span className="text-red-400">3045%</span>, 에너지의 잔재 <span className="text-green-400">4410%</span> → <span className="text-red-400">4375%</span></p>
                        </div>
                    </div>
                </section>

                {/* Wild Hunter */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/와일드헌터.png" alt="와일드헌터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-green-400">와일드헌터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">프라이멀 센스 🔼</span>: 최종 데미지 <span className="text-red-400">10%</span> → <span className="text-green-400">14%</span></p>
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">익스텐드 매거진 ✨ 신규!</span>: 공격력 63 증가 기능 추가</p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">와일드 발칸 : 에이펙스 VI 🔼</span>: 지속 공격 <span className="text-red-400">742%</span> → <span className="text-green-400">862%</span>, 유탄 폭발 <span className="text-red-400">612%</span> → <span className="text-green-400">702%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">기어 스톰 🔽</span>: 강타 <span className="text-green-400">3330%</span> → <span className="text-red-400">3290%</span>, 무차별 폭격 <span className="text-green-400">7810%</span> → <span className="text-red-400">7735%</span></p>
                        </div>
                    </div>
                </section>

                {/* Xenon */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-purple-900/30 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/제논.png" alt="제논" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-cyan-400">제논</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">오파츠 코드 🔼</span>: 최종 데미지 <span className="text-red-400">30%</span> → <span className="text-green-400">32%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">멀티래터럴 VI 🔼</span>: 최종 데미지 <span className="text-red-400">15%</span> → <span className="text-green-400">17%</span></p>
                            <p className="text-slate-300 text-sm">• 멜트다운 익스플로젼 / VI: 홀로그램 그래피티 융합 재설치 시 동작 취소 오류 수정</p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">네오테릭 트라이스 🔽</span>: 파동 <span className="text-green-400">7070%</span> → <span className="text-red-400">7000%</span>, 에너지 분출 <span className="text-green-400">4375%</span> → <span className="text-red-400">4331%</span></p>
                        </div>
                    </div>
                </section>

                {/* Mechanic */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-gray-900/30 to-blue-900/30 border-2 border-gray-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/메카닉.png" alt="메카닉" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-gray-300">메카닉</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">메카닉 마스터리 🔼</span>: 크리티컬 데미지 <span className="text-red-400">5%</span> → <span className="text-green-400">8%</span></p>
                            <p className="text-slate-300 text-sm">• 로봇 트랜지션 : CB-P1: VI 스킬 강화 방식 변경 (활성화 시 상시 장착)</p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">메탈아머 : 익스터미네이션 🔽</span>: 데미지 <span className="text-green-400">8435%</span> → <span className="text-red-400">8331%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Kaiser */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/카이저.png" alt="카이저" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-red-400">카이저</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">카탈라이즈 🔼</span>: 최종 데미지 <span className="text-red-400">30%</span> → <span className="text-green-400">33%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">언플리칭 커리지 🔼</span>: 크리티컬 데미지 <span className="text-red-400">6%</span> → <span className="text-green-400">8%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">파이로 인스팅트 🔽</span>: 데미지 <span className="text-green-400">10640%</span> → <span className="text-red-400">10325%</span></p>
                        </div>
                    </div>
                </section>

                {/* Cadena */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/카데나.png" alt="카데나" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">카데나</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">베이직 디텍션 ✨ 신규!</span>: 최종 데미지 4% 증가 기능 추가</p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">프로페셔널 에이전트 🔽</span>: 데미지 <span className="text-green-400">255%</span> → <span className="text-red-400">220%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">체인아츠:퓨리 🔼</span>: 데미지 <span className="text-red-400">990%</span> → <span className="text-green-400">1045%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">프로페셔널 에이전트 VI 🔽</span>: 데미지 <span className="text-green-400">425%</span> → <span className="text-red-400">360%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">브루탈 래비지 🔽</span>: 비격 <span className="text-green-400">11900%</span> → <span className="text-red-400">11620%</span>, 분쇄 <span className="text-green-400">12460%</span> → <span className="text-red-400">11830%</span></p>
                        </div>
                    </div>
                </section>

                {/* Angelic Buster */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-2 border-pink-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/엔젤릭버스터.png" alt="엔젤릭버스터" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-pink-400">엔젤릭버스터</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">콜 오브 에인션트 🔼</span>: 공격력 증가 <span className="text-red-400">40</span> → <span className="text-green-400">45</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">어피니티 III 🔼</span>: 최종 데미지 <span className="text-red-400">10%</span> → <span className="text-green-400">12%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">샤이닝 로터스 🔼</span>: 민첩성 증가 <span className="text-red-400">20</span> → <span className="text-green-400">40</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">트리니티 퓨전 🔼</span>: 데미지 <span className="text-red-400">360%</span> → <span className="text-green-400">395%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">제뉴인 앙코르 🔽</span>: 파동 <span className="text-green-400">7491%</span> → <span className="text-red-400">7313%</span>, 매력 발산 <span className="text-green-400">7341%</span> → <span className="text-red-400">7167%</span></p>
                        </div>
                    </div>
                </section>

                {/* Zero */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/제로.png" alt="제로" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-blue-400">제로</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">대검 마스터리 🔼</span>: 최종 데미지 <span className="text-red-400">23%</span> → <span className="text-green-400">26%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">태도 마스터리 🔼</span>: 최종 데미지 <span className="text-red-400">23%</span> → <span className="text-green-400">26%</span></p>
                            <p className="text-slate-300 text-sm">• 아머 스플릿: 보스 체력 UI 디버프 아이콘 깜빡임 수정</p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">에고 웨폰 🔼</span>: 알파 <span className="text-red-400">500%</span> → <span className="text-green-400">550%</span>, 베타 <span className="text-red-400">500%</span> → <span className="text-green-400">550%</span></p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">바이템포리스 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 각성: <span className="text-green-400">5670%</span> → <span className="text-red-400">5460%</span></p>
                                <p className="text-sm ml-6">• 붕괴: <span className="text-green-400">6125%</span> → <span className="text-red-400">5880%</span></p>
                                <p className="text-sm ml-6">• 중첩: <span className="text-green-400">6335%</span> → <span className="text-red-400">6160%</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Kinesis */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/키네시스.png" alt="키네시스" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-purple-400">키네시스</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="text-slate-300 text-sm">• 얼티메이트:갬빗 / VI: 공격 발생 오류 수정</p>
                            <p className="text-slate-300 text-sm">• 싸이킥 불릿: 스킬 이펙트 변경</p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">텔레키네시스 VI 🔼</span>: 에너지탄 <span className="text-red-400">187%</span> → <span className="text-green-400">208%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">싸이킥 스매싱 VI 🔼</span>: 데미지 <span className="text-red-400">727%</span> → <span className="text-green-400">785%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">프렉탈 호라이즌 🔽</span>: 데미지 <span className="text-green-400">1554%</span> → <span className="text-red-400">1540%</span></p>
                        </div>
                    </div>
                </section>

                {/* Adele */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/아델.png" alt="아델" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-blue-400">아델</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">마스터리 🔼</span>: 크리티컬 데미지 <span className="text-red-400">6%</span> → <span className="text-green-400">11%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">어테인 🔼</span>: 데미지 증가 <span className="text-red-400">10%</span> → <span className="text-green-400">13%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">게더링 VI 🔼</span>: 데미지 <span className="text-red-400">1035%</span> → <span className="text-green-400">1190%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">블로섬 VI 🔼</span>: 데미지 <span className="text-red-400">1100%</span> → <span className="text-green-400">1270%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">아인하이트 🔽</span>: 참격 <span className="text-green-400">8120%</span> → <span className="text-red-400">7910%</span></p>
                        </div>
                    </div>
                </section>

                {/* Illium */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/일리움.png" alt="일리움" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-cyan-400">일리움</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2 text-blue-400"><Plus className="w-4 h-4" /><span className="font-semibold">크리스탈 스킬:글로리 윙 ✨ 신규!</span>: 비행하지 않는 랜딩 모드 추가</p>
                            <p className="text-slate-300 text-sm">• 크래프트:자벨린 II: 글로리 윙 20레벨 이상 습득 시 사용 가능, 매직 미사일 데미지 표시 수정</p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">그람홀더 🔽</span>: 데미지 <span className="text-green-400">1320%</span> → <span className="text-red-400">1220%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">크래프트:자벨린 VI 🔽</span>: 데미지 <span className="text-green-400">580%</span> → <span className="text-red-400">551%</span>, 파편 <span className="text-green-400">200%</span> → <span className="text-red-400">190%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">크리스탈 스킬:데우스 VI 🔽</span>: 데미지 <span className="text-green-400">2050%</span> → <span className="text-red-400">1890%</span>, 위성 <span className="text-green-400">545%</span> → <span className="text-red-400">500%</span></p>
                            <p className="text-slate-300 text-sm">• 크래프트:롱기누스 VI: 맵 이동 시 연결 끊김 수정</p>
                        </div>
                    </div>
                </section>

                {/* Khali */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/칼리.png" alt="칼리" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-indigo-400">칼리</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">인투이션 🔼</span>: 최종 데미지 <span className="text-red-400">25%</span> → <span className="text-green-400">28%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">보이드 블리츠 VI 🔼</span>: 데미지 <span className="text-red-400">370%</span> → <span className="text-green-400">399%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">보이드 어웨이크 🔽</span>: 질주 <span className="text-green-400">5915%</span> → <span className="text-red-400">5800%</span>, 초월 차크리 <span className="text-green-400">6310%</span> → <span className="text-red-400">6185%</span></p>
                        </div>
                    </div>
                </section>

                {/* Ark */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-purple-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/아크.png" alt="아크" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-yellow-400">아크</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <div className="bg-red-900/30 rounded-lg p-4 border-2 border-red-500">
                                <p className="flex items-center gap-2 mb-2"><TrendingDown className="w-5 h-5 text-red-400" /><span className="font-bold text-lg">융합 완성 🔽</span></p>
                                <p className="text-sm">• 보스 몬스터 공격 시 데미지 증가: <span className="text-green-400 font-bold">30%</span> → <span className="text-red-400 font-bold">12%</span></p>
                            </div>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">절대 심연의 속삭임 🔼</span>: 심연의 기운 <span className="text-red-400">5355%</span> → <span className="text-green-400">5565%</span>, 심연의 칼날 <span className="text-red-400">6710%</span> → <span className="text-green-400">6965%</span></p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-12" />

                {/* Lara */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/라라.png" alt="라라" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-green-400">라라</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">용맥 흡수 VI 🔼</span>: 용맥 분출 VI 최종 데미지 <span className="text-red-400">20%</span> → <span className="text-green-400">26%</span></p>
                        </div>
                    </div>
                </section>

                {/* Ren */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/30 to-black/30 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/렌.png" alt="렌" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-red-400">렌</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">고급 장검 숙련 🔼</span>: 최종 데미지 <span className="text-red-400">9%</span> → <span className="text-green-400">11%</span></p>
                            <p className="text-slate-300 text-sm">• 망혼검 절기 : 무량겁 / VI: 타격 이펙트 출력 시간 수정</p>
                            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-500/30 mt-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="font-semibold">창룡파천검 : 일매낙화 천비인적 🔽</span>
                                </div>
                                <p className="text-sm ml-6">• 낙화: <span className="text-green-400">3190%</span> → <span className="text-red-400">3075%</span></p>
                                <p className="text-sm ml-6">• 진천: <span className="text-green-400">5655%</span> → <span className="text-red-400">5450%</span></p>
                                <p className="text-sm ml-6">• 천강: <span className="text-green-400">3815%</span> → <span className="text-red-400">3678%</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hoyoung */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-yellow-900/30 to-red-900/30 border-2 border-yellow-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <Image src="/images/jobs/호영.png" alt="호영" width={64} height={64} className="rounded-lg" />
                            <h2 className="text-2xl font-bold text-yellow-400">호영</h2>
                        </div>
                        <div className="space-y-2 text-slate-200">
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">고급 부채 숙련 🔼</span>: 공격력 <span className="text-red-400">40</span> → <span className="text-green-400">50</span>, 최종 데미지 <span className="text-red-400">31%</span> → <span className="text-green-400">33%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">추적 귀화부 VI 🔼</span>: 데미지 <span className="text-red-400">410%</span> → <span className="text-green-400">440%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">권술 : 호접지몽 VI 🔼</span>: 데미지 <span className="text-red-400">826%</span> → <span className="text-green-400">884%</span></p>
                            <p className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="font-semibold">선기 : 천지인 환영 🔼</span>: 데미지 <span className="text-red-400">1375%</span> → <span className="text-green-400">1540%</span></p>
                            <p className="flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="font-semibold">천세휘령 🔽</span>: 기운 <span className="text-green-400">4504%</span> → <span className="text-red-400">4410%</span>, 휘령 <span className="text-green-400">4322%</span> → <span className="text-red-400">4270%</span></p>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <AlertCircle className="w-6 h-6 text-purple-400" />
                            종합 분석
                        </h2>

                        <div className="space-y-4 text-slate-300">
                            <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-5">
                                <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5" />
                                    주요 상향 포인트
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><span className="text-blue-400 font-bold">다크나이트</span>: 신규 스킬 리인카네이션 알터 추가 - 원하는 타이밍에 수동 발동 가능</li>
                                    <li><span className="text-blue-400 font-bold">히어로</span>: 레이징 블로우 계열 전체 상향 (약 12% 증가)</li>
                                    <li><span className="text-blue-400 font-bold">비숍</span>: 트라이엄프 페더 VI 20% 증가, 제네시스 VI 10% 증가</li>
                                    <li><span className="text-blue-400 font-bold">보우마스터/신궁</span>: 아머 피어싱, 마크맨쉽 등 기본 패시브 대폭 강화</li>
                                    <li><span className="text-blue-400 font-bold">섀도어</span>: 대거 마스터리 최종 데미지 6% → 9%, 실드 마스터리 공격력 5 증가</li>
                                    <li><span className="text-blue-400 font-bold">듀얼블레이드</span>: 섀도우 이베이젼 크리티컬 데미지 5% 증가 기능 신규 추가</li>
                                    <li><span className="text-blue-400 font-bold">와일드헌터</span>: 프라이멀 센스 10% → 14%, 익스텐드 매거진 공격력 63 신규, 와일드 발칸 VI 16% 상향</li>
                                    <li><span className="text-blue-400 font-bold">제논</span>: 오파츠 코드 30% → 32%, 멀티래터럴 VI 15% → 17%</li>
                                    <li><span className="text-blue-400 font-bold">메카닉</span>: 메카닉 마스터리 크리티컬 데미지 3% 상향</li>
                                    <li><span className="text-blue-400 font-bold">카데나</span>: 베이직 디텍션 최종 데미지 4% 증가 기능 신규 추가</li>
                                    <li><span className="text-blue-400 font-bold">제로</span>: 대검/태도 마스터리 최종 데미지 각 3% 증가</li>
                                    <li><span className="text-blue-400 font-bold">아델</span>: 마스터리 크리티컬 데미지 6% → 11%, 게더링/블로섬 VI 대폭 상향</li>
                                    <li><span className="text-blue-400 font-bold">칼리</span>: 인투이션 최종 데미지 3% 상향</li>
                                    <li><span className="text-blue-400 font-bold">은월</span>: 일치단결 크뎀 4% 상향, 호기서림 최뎀 3% 상향으로 대폭 강화</li>
                                    <li><span className="text-blue-400 font-bold">호영</span>: 고급 부채 숙련 공격력 10 상향, 최종 데미지 2% 상향</li>
                                </ul>
                            </div>

                            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-5">
                                <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                                    <TrendingDown className="w-5 h-5" />
                                    주요 하향 포인트
                                </h3>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li><span className="font-bold">팔라딘</span>: 팔라딘 엑스퍼트 최종/크뎀 하향, 디바인 저지먼트 계열 전체 하향</li>
                                    <li><span className="font-bold">나이트로드</span>: 크루셜 어썰트 파동/폭발 약 1% 하향</li>
                                    <li><span className="font-bold">소울마스터</span>: 토탈리티 합일의 풍압/혼참의 맹참 하향</li>
                                    <li><span className="font-bold">스트라이커</span>: 질도섬멸 맹공/격류 하향</li>
                                    <li><span className="font-bold">에반</span>: 유니온 드라이브 마력 공격/공명의 파동 하향</li>
                                    <li><span className="font-bold">루미너스</span>: 메모라이즈 5% 하향, 리버레이션 오브 6% 하향, 트와일라잇 노바 VI 하향</li>
                                    <li><span className="font-bold">메르세데스</span>: 이그니스 로어 최종 데미지 3% 하향, 엘리멘탈 고스트 하향, 유니콘 스파이크 VI 하향</li>
                                    <li><span className="font-bold">팬텀</span>: 케인 엑스퍼트 1% 하향, 블랙잭 전체 12-15% 하향</li>
                                    <li><span className="font-bold">데몬슬레이어</span>: 아메시스틴 인트루젼 약 0.6% 하향</li>
                                    <li><span className="font-bold">와일드헌터</span>: 기어 스톰 강타/무차별 폭격 미세 하향</li>
                                    <li><span className="font-bold">카데나</span>: 프로페셔널 에이전트 VI 15% 하향, 브루탈 래비지 2-5% 하향</li>
                                    <li><span className="font-bold">일리움</span>: 그람홀더 7% 하향, 크래프트:자벨린 VI 5% 하향, 데우스 VI 8% 하향</li>
                                    <li><span className="font-bold">칼리</span>: 보이드 어웨이크 질주/초월 차크리 약 2% 하향</li>
                                    <li><span className="font-bold">아크</span>: 융합 완성 보스 데미지 30% → 12% (18%p 감소)</li>
                                    <li><span className="font-bold">렌</span>: 창룡파천검 : 일매낙화 천비인적 낙화/진천/천강 하향</li>
                                    <li><span className="font-bold">호영</span>: 천세휘령 기운/휘령 약 1-2% 하향</li>
                                </ul>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-5">
                                <h3 className="text-lg font-bold text-blue-400 mb-3">💡 패치 총평</h3>
                                <p className="text-sm leading-relaxed">
                                    이번 패치는 <span className="font-bold">전반적인 밸런스 조정</span>에 중점을 둔 업데이트입니다.
                                    다크나이트의 신규 생존기 추가, 히어로/비숍 등 주력 딜러들의 상향, 그리고 와일드헌터/제논/은월 등
                                    상대적으로 약했던 직업들의 의미있는 강화가 이루어졌습니다.
                                    반면 팔라딘, 루미너스, 메르세데스, 팬텀, 일리움 등 상위권 직업들은 적절히 하향되어
                                    직업 간 격차가 줄어들 것으로 예상됩니다.
                                    특히 레지스탕스와 시그너스 기사단의 다수 직업이 상향되어 주목할 만합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bg-yellow-900/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center mb-12">
                    <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">전체 직업 상세 내역</h3>
                    <p className="text-slate-300">
                        위 내용은 테스트월드 클라이언트 1.2.197의 전체 직업 스킬 밸런스 변경사항을 정리한 것입니다.<br />
                        본 패치는 2026년 1월 15일 본섭에 적용될 예정입니다.
                    </p>
                </div>

                {/* Next Steps */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">나의 직업은 어떻게 변할까?</h3>
                        <p className="text-slate-300 mb-6">
                            메이플 AI에서 자신의 캐릭터를 진단하고,<br />
                            이번 패치가 미칠 영향을 확인해보세요!
                        </p>
                        <Link href="/">
                            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl">
                                무료 진단 시작하기
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Back to Blog */}
                <div className="text-center pt-8 border-t border-slate-800">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        블로그 목록으로 돌아가기
                    </Link>
                </div>
            </main>
        </div>
    );
}
