import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Maple AI 소개 | 메이플스토리 AI 진단 & 가이드 플랫폼',
    description: 'Maple AI는 메이플스토리 유저들을 위한 AI 기반 캐릭터 진단, 장비 분석, 그리고 종합 가이드를 제공하는 플랫폼입니다. 데이터 기반의 정확한 분석으로 더 나은 성장을 도와드립니다.',
    keywords: '메이플스토리, AI 진단, 캐릭터 분석, 스펙업 가이드, 메이플 가이드',
    openGraph: {
        title: 'Maple AI 소개 | 메이플스토리 AI 진단 & 가이드 플랫폼',
        description: 'Maple AI는 메이플스토리 유저들을 위한 AI 기반 캐릭터 진단, 장비 분석, 그리고 종합 가이드를 제공합니다.',
        url: 'https://maple.ai.kr/about',
        type: 'website',
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Maple AI 소개
                    </h1>
                    <p className="text-xl text-slate-300">
                        메이플스토리 유저를 위한 AI 기반 종합 진단 & 가이드 플랫폼
                    </p>
                </div>

                {/* Mission */}
                <section className="mb-16 bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">우리의 미션</h2>
                    <p className="text-lg text-slate-300 leading-relaxed mb-4">
                        Maple AI는 <strong>데이터 기반의 정확한 분석</strong>과 <strong>AI 기술</strong>을 활용하여
                        메이플스토리 유저 여러분의 캐릭터 성장을 돕는 것을 목표로 합니다.
                    </p>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        복잡한 메이플스토리의 시스템을 쉽고 명확하게 이해할 수 있도록,
                        그리고 성장 방향을 한눈에 파악할 수 있도록 도와드립니다.
                    </p>
                </section>

                {/* Main Features */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-purple-400">주요 기능</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-xl p-6 border border-blue-700/50">
                            <h3 className="text-xl font-bold mb-3 text-blue-300">🤖 AI 캐릭터 진단</h3>
                            <p className="text-slate-300">
                                캐릭터 정보를 분석하여 장비, 잠재능력, 추가옵션, 스타포스 등을
                                종합적으로 진단하고 개선 방향을 AI가 제시합니다.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-700/50">
                            <h3 className="text-xl font-bold mb-3 text-purple-300">📊 보스 성장 단계 분석</h3>
                            <p className="text-slate-300">
                                현재 캐릭터의 전투력을 분석하여 도전 가능한 보스 단계를 판정하고,
                                다음 목표를 명확하게 제시합니다.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-xl p-6 border border-green-700/50">
                            <h3 className="text-xl font-bold mb-3 text-green-300">📚 종합 가이드</h3>
                            <p className="text-slate-300">
                                헥사 스탯, 어빌리티, 시드링, 쿨모자 등 다양한 시스템에 대한
                                상세하고 이해하기 쉬운 가이드를 제공합니다.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-xl p-6 border border-orange-700/50">
                            <h3 className="text-xl font-bold mb-3 text-orange-300">📰 실시간 뉴스 & AI 요약</h3>
                            <p className="text-slate-300">
                                메이플스토리의 최신 공지사항과 업데이트 소식을 실시간으로 제공하며,
                                AI가 핵심 내용을 간결하게 요약해드립니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technology */}
                <section className="mb-16 bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                    <h2 className="text-3xl font-bold mb-6 text-green-400">기술 스택</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">🔗 Nexon Open API</h3>
                            <p className="text-slate-300">
                                넥슨이 공식 제공하는 API를 통해 실시간으로 캐릭터 정보를 가져와
                                정확한 데이터 기반의 분석을 제공합니다.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">🧠 AI 분석 엔진</h3>
                            <p className="text-slate-300">
                                최신 AI 기술을 활용하여 캐릭터의 장비, 잠재능력, 스탯 등을 분석하고
                                개인화된 조언을 제공합니다.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-slate-200">📈 실시간 데이터 업데이트</h3>
                            <p className="text-slate-300">
                                메이플스토리의 패치와 업데이트에 맞춰 가이드와 진단 로직을
                                지속적으로 업데이트합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">핵심 가치</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">🎯</div>
                            <h3 className="text-xl font-bold mb-2 text-slate-200">정확성</h3>
                            <p className="text-slate-400">공식 API와 검증된 데이터만을 사용합니다</p>
                        </div>
                        <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">💡</div>
                            <h3 className="text-xl font-bold mb-2 text-slate-200">명확성</h3>
                            <p className="text-slate-400">복잡한 내용을 쉽게 이해할 수 있게 전달합니다</p>
                        </div>
                        <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                            <div className="text-4xl mb-3">🚀</div>
                            <h3 className="text-xl font-bold mb-2 text-slate-200">지속성</h3>
                            <p className="text-slate-400">게임 업데이트에 맞춰 꾸준히 개선합니다</p>
                        </div>
                    </div>
                </section>

                {/* Data Source */}
                <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-400">데이터 출처</h2>
                    <p className="text-slate-300 mb-4">
                        Maple AI의 모든 캐릭터 정보는
                        <a
                            href="https://openapi.nexon.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 underline ml-1"
                        >
                            Nexon Open API
                        </a>
                        를 통해 제공됩니다.
                    </p>
                    <p className="text-slate-400 text-sm">
                        Data based on NEXON DEVELOPERS
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="/"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
                    >
                        캐릭터 진단 시작하기
                    </a>
                </div>
            </div>
        </div>
    );
}
