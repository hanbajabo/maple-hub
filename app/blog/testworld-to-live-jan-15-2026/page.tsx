'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Sparkles, Gift, Palette, Star, Zap, AlertCircle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function TestworldToLiveJan152026() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2 sm:mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                            업데이트 정보
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                            테섭→본섭
                        </span>
                        <span className="text-slate-500 text-sm">2026년 1월 15일</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        🔥 1월 15일 테섭→본섭 업데이트 총정리
                    </h1>
                    <p className="text-lg text-slate-400">
                        테스트월드에서 본서버로 오면서 추가되거나 변경된 주요 사항들을 한눈에 확인하세요!
                    </p>
                </header>

                {/* Image Source Attribution */}
                <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <p className="text-slate-400 text-sm">
                        📸 <span className="font-bold text-slate-300">이미지 출처:</span> 해당 내용 이미지는 네이버 블로그 <a href="https://blog.naver.com/seotbeo/224147150923" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">섣버의 메이플월드</a>의 '[메이플스토리, KMS v1.2.411] 변경점 툴팁' 글에서 사용하였습니다.
                    </p>
                </div>

                {/* Table of Contents */}
                <div className="mb-12 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-500/50 rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        이번 업데이트 하이라이트
                    </h2>
                    <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>솔 헤카테 온/오프 기능 추가</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>솔 에르다 캐시 판매 5배 증가</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>유피테르/캘리/에일린 등장 (최강 보스 예고)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>윈터 부티크 합체 칭호 수정</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>하반기 베스트 헤어/성형 추가</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>신규 일러스트 4종 추가</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-1">▸</span>
                            <span>하드 흉성 리워드 수정</span>
                        </li>
                    </ul>
                </div>

                {/* Update 1: Sol Hecate */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-purple-400">
                                    1. 솔 헤카테 온/오프 기능 추가
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    새로운 기능
                                </h3>
                                <div className="space-y-3 text-slate-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-400 font-bold">•</span>
                                        <div>
                                            <p className="font-bold text-white">솔 헤카테 반투명 적용 온/오프</p>
                                            <p className="text-sm text-slate-400 mt-1">마우스 우클릭으로 반투명 효과를 켜고 끌 수 있습니다</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-400 font-bold">•</span>
                                        <div>
                                            <p className="font-bold text-white">일러스트 연출 온/오프</p>
                                            <p className="text-sm text-slate-400 mt-1">마우스 우클릭으로 일러스트 연출을 제어할 수 있습니다</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/sol_hecate_skill_comparison.jpg"
                                        alt="솔 헤카테 플레게톤 스킬 반투명/일러스트 연출 온오프 비교"
                                        width={700}
                                        height={350}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">유용한 팁</p>
                                        <p className="text-sm text-slate-300">
                                            솔 헤카테가 화면을 가려서 불편하셨던 분들께 유용한 기능입니다. 이제 우클릭으로 간편하게 설정을 변경할 수 있습니다!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Update 2: Sol Erda */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-green-400">
                                    2. 솔 에르다 캐시 판매 증가
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">가격 정책 변경</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                        <p className="text-red-400 font-bold mb-2">이전</p>
                                        <p className="text-slate-300">1개에 <span className="text-white font-bold">10,000 캐시</span></p>
                                    </div>
                                    <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">변경 후</p>
                                        <p className="text-slate-300">5개에 <span className="text-white font-bold">10,000 캐시</span></p>
                                        <p className="text-green-400 text-sm mt-1">⬆️ 5배 더 많이!</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/sol_erda_cash.jpg"
                                        alt="솔 에르다 캐시 판매 정보"
                                        width={600}
                                        height={400}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-yellow-300 font-bold mb-1">의미</p>
                                        <p className="text-sm text-slate-300">
                                            개당 가격이 10,000 캐시에서 2,000 캐시로 대폭 하락! 솔 에르다를 훨씬 저렴하게 구매할 수 있게 되었습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AdSense Ad */}
                <InArticleAd
                    dataAdSlot="8162808816"
                    className="my-12"
                />

                {/* Update 3: Jupiter */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-orange-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-orange-400">
                                    3. 유피테르/캘리/에일린 등장
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/new_illustrations_jan2026.jpg"
                                        alt="유피테르, 캘리, 에일린 신규 일러스트"
                                        width={900}
                                        height={320}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    최강 보스 예고
                                </h3>
                                <p className="text-slate-300 mb-4">
                                    현 최강 보스로 나올 예정인 <span className="text-orange-400 font-bold">유피테르</span>가 스토리에 잠깐 등장합니다.
                                </p>
                                <div className="bg-orange-900/20 border border-orange-500/50 rounded-lg p-4">
                                    <p className="text-sm text-slate-300">
                                        <span className="text-orange-400 font-bold">유피테르</span>, <span className="text-orange-400 font-bold">캘리</span>, <span className="text-orange-400 font-bold">에일린</span> 세 명의 캐릭터가 등장하며, 향후 메이플스토리의 주요 콘텐츠로 자리잡을 것으로 보입니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Update 4: Title */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-blue-400">
                                    4. 윈터 부티크 합체 칭호 수정
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">공/마 +30 중복 삭제</h3>
                                <p className="text-slate-300 mb-4">
                                    사냥 + 보스 합체 칭호에 붙어있던 <span className="text-red-400 line-through">중복 공/마+30</span>이 <span className="text-yellow-400 font-bold">툴팁 오류</span>였기 때문에 수정되었습니다.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                        <p className="text-red-400 font-bold mb-2">이전 (오류)</p>
                                        <p className="text-slate-300">공/마 <span className="text-red-400 font-bold line-through">+30 (중복)</span></p>
                                    </div>
                                    <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">수정 후</p>
                                        <p className="text-slate-300">공/마 <span className="text-white font-bold">+30</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/winter_boutique_title_comparison.jpg"
                                        alt="윈터 부티크 액션 칭호 교환권 수정 전후 비교"
                                        width={700}
                                        height={350}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">참고</p>
                                        <p className="text-sm text-slate-300">
                                            중복으로 표시되어 있던 것은 표시 오류였으며, 실제 능력치는 변경되지 않았습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Update 5: Hair/Face */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-2 border-pink-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                                <Palette className="w-6 h-6 text-pink-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-pink-400">
                                    5. 하반기 베스트 헤어/성형 추가 예정
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/best_hair_face_coupon.jpg"
                                        alt="하반기 BEST 프리미엄 헤어/성형 쿠폰"
                                        width={700}
                                        height={250}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-400" />
                                    2025 하반기 인기 스타일
                                </h3>
                                <p className="text-slate-300 mb-4">
                                    하반기에 가장 많은 사랑을 받았던 헤어/성형 쿠폰이 판매될 예정입니다.
                                </p>
                                <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-4">
                                    <p className="text-yellow-300 font-bold mb-2">📋 목록 확인</p>
                                    <p className="text-sm text-slate-300">
                                        정확한 헤어/성형 목록은 <span className="text-pink-400 font-bold">업데이트 후</span> 확인할 수 있습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Update 6: Illustrations */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-2 border-indigo-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-indigo-400">
                                    6. 신규 일러스트 추가
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-6 mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/illustration_characters.jpg"
                                        alt="신규 캐릭터 일러스트"
                                        width={900}
                                        height={360}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/illustration_war_scene.png"
                                        alt="전쟁 장면 일러스트"
                                        width={900}
                                        height={360}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">새로운 일러스트 4종</h3>
                                <p className="text-slate-300">
                                    총 <span className="text-indigo-400 font-bold">4개</span>의 신규 일러스트가 게임에 추가되었습니다.
                                </p>
                                <p className="text-slate-400 text-sm mt-2">
                                    3번 섹션의 유피테르/캘리/에일린 이미지를 포함하여 다양한 일러스트가 추가되었습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Update 7: Hard Chosen Seren */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-red-900/50 to-pink-900/50 border-2 border-red-500/50 rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <Gift className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-black text-red-400">
                                    7. 하드 흉성 리워드 수정
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-2xl">
                                    <Image
                                        src="/images/blog/chosen_seren_reward.png"
                                        alt="찬란한 흉성 및 신념의 연마석 보상"
                                        width={800}
                                        height={200}
                                        className="mx-auto rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-900/50 rounded-lg p-5 border border-slate-700">
                                <h3 className="font-bold text-white mb-3">보상 아이템 변경</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                                        <p className="text-red-400 font-bold mb-2">이전</p>
                                        <p className="text-slate-300"><span className="text-red-400 line-through">생명의 연마석</span></p>
                                    </div>
                                    <div className="bg-green-900/20 border border-green-500/50 rounded-lg p-4">
                                        <p className="text-green-400 font-bold mb-2">변경 후</p>
                                        <p className="text-slate-300"><span className="text-green-400 font-bold">신념의 연마석</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-blue-300 font-bold mb-1">보스 정보</p>
                                        <p className="text-sm text-slate-300">
                                            하드 흉성(하드 선택받은 세렌) 클리어 시 받을 수 있는 보상이 더 유용한 아이템으로 변경되었습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary */}
                <section className="mb-12">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500 rounded-xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                            정리
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-center mb-6">
                            1월 15일 테섭에서 본섭으로 넘어오면서 다양한 개선사항과 새로운 콘텐츠가 추가되었습니다.<br />
                            특히 <span className="text-green-400 font-bold">솔 에르다 가격 인하</span>와 <span className="text-purple-400 font-bold">솔 헤카테 편의성 개선</span>은 많은 유저들에게 도움이 될 것으로 보입니다!
                        </p>
                        <div className="text-center">
                            <p className="text-slate-400 text-lg">
                                새로운 업데이트와 함께 즐거운 메이플 라이프 되세요! 🍁
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12">
                    <div className="text-center">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            블로그 메인으로
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
