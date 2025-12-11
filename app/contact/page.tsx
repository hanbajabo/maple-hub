import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '문의하기 | Maple AI',
    description: 'Maple AI 서비스에 대한 문의, 제안, 버그 제보를 받습니다. 언제든 편하게 연락주세요.',
    keywords: '문의, 고객센터, 버그 제보, 기능 제안',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    문의하기
                </h1>

                <div className="mb-12 text-center">
                    <p className="text-xl text-slate-300">
                        Maple AI에 대한 문의, 제안, 버그 제보를 환영합니다! 🎮
                    </p>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Email */}
                    <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-8 border border-blue-700/50">
                        <div className="text-5xl mb-4">📧</div>
                        <h2 className="text-2xl font-bold mb-4 text-blue-300">이메일 문의</h2>
                        <p className="text-slate-300 mb-4">
                            일반 문의, 제휴 문의, 기능 제안 등 모든 문의를 받습니다.
                        </p>
                        <a
                            href="mailto:p6092@Naver.com"
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
                        >
                            p6092@Naver.com
                        </a>
                    </div>

                    {/* Bug Report */}
                    <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 rounded-2xl p-8 border border-red-700/50">
                        <div className="text-5xl mb-4">🐛</div>
                        <h2 className="text-2xl font-bold mb-4 text-red-300">버그 제보</h2>
                        <p className="text-slate-300 mb-4">
                            서비스 이용 중 발견한 버그나 오류를 신속히 처리해드립니다.
                        </p>
                        <a
                            href="mailto:p6092@Naver.com"
                            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-colors"
                        >
                            p6092@Naver.com
                        </a>
                    </div>
                </div>

                {/* FAQ */}
                <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">자주 묻는 질문 (FAQ)</h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. 캐릭터 정보가 조회되지 않아요</h3>
                            <p className="text-slate-300 pl-4">
                                A. Nexon Open API를 사용하므로, API 서버 상태나 캐릭터명 오타를 확인해주세요.
                                최근에 생성한 캐릭터는 API 반영에 시간이 걸릴 수 있습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. AI 진단 결과가 이상해요</h3>
                            <p className="text-slate-300 pl-4">
                                A. AI 진단은 참고 자료이며, 메이플스토리의 복잡한 시스템 특성상 100% 정확하지 않을 수 있습니다.
                                명백한 오류는 버그 제보를 통해 알려주시면 개선하겠습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. 새로운 기능을 제안하고 싶어요</h3>
                            <p className="text-slate-300 pl-4">
                                A. 언제든 환영합니다! 이메일을 통해 자유롭게 의견을 보내주세요.
                                좋은 아이디어는 적극 반영하겠습니다.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. 개인정보는 안전한가요?</h3>
                            <p className="text-slate-300 pl-4">
                                A. Maple AI는 별도의 회원가입이 없으며, 캐릭터명을 통해 공개된 정보만을 조회합니다.
                                개인정보를 수집하거나 저장하지 않습니다. 자세한 내용은
                                <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline ml-1">
                                    개인정보처리방침
                                </a>
                                을 참조하세요.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. 정보가 업데이트되지 않아요</h3>
                            <p className="text-slate-300 pl-4">
                                A. Nexon API는 주기적으로 업데이트되므로, 게임 내 변경사항이 즉시 반영되지 않을 수 있습니다.
                                일정 시간 후 다시 조회해주세요.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2 text-blue-400">Q. 모바일에서도 사용할 수 있나요?</h3>
                            <p className="text-slate-300 pl-4">
                                A. 네! Maple AI는 반응형 웹으로 제작되어 PC, 태블릿, 모바일 모두에서 사용 가능합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Response Time */}
                <section className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 mb-16">
                    <h2 className="text-2xl font-bold mb-4 text-green-400">답변 소요 시간</h2>
                    <div className="space-y-3 text-slate-300">
                        <p>
                            <strong className="text-green-300">일반 문의:</strong> 영업일 기준 1-3일 이내 답변
                        </p>
                        <p>
                            <strong className="text-red-300">긴급 버그:</strong> 24시간 이내 확인 및 대응
                        </p>
                        <p className="text-sm text-slate-400 mt-4">
                            * 문의량에 따라 답변이 지연될 수 있습니다. 양해 부탁드립니다.
                        </p>
                    </div>
                </section>

                {/* Community Guidelines */}
                <section className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-700/50">
                    <h2 className="text-2xl font-bold mb-4 text-purple-300">문의 시 참고사항</h2>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        <li>구체적인 상황 설명을 포함해주시면 빠른 해결에 도움이 됩니다</li>
                        <li>버그 제보 시 스크린샷이나 캐릭터명을 함께 보내주시면 좋습니다</li>
                        <li>욕설, 비방 등 부적절한 내용은 답변하지 않습니다</li>
                        <li>같은 내용의 중복 문의는 피해주세요</li>
                    </ul>
                </section>

                {/* Back to Home */}
                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition-colors"
                    >
                        홈으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}
