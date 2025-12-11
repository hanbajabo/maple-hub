import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '이용약관 | Maple AI',
    description: 'Maple AI 서비스 이용약관입니다. 서비스를 이용하기 전에 반드시 확인해주세요.',
    robots: 'index, follow',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    이용약관
                </h1>

                <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 space-y-8">
                    {/* 제1조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제1조 (목적)</h2>
                        <p className="text-slate-300 leading-relaxed">
                            본 약관은 Maple AI(이하 "서비스")가 제공하는 메이플스토리 관련 정보 조회,
                            AI 진단, 가이드 등의 서비스 이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임사항,
                            기타 필요한 사항을 규정함을 목적으로 합니다.
                        </p>
                    </section>

                    {/* 제2조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제2조 (정의)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    <strong>"서비스"</strong>란 Maple AI가 제공하는 메이플스토리 캐릭터 정보 조회,
                                    AI 기반 진단, 각종 가이드, 뉴스 정보 등 모든 서비스를 의미합니다.
                                </li>
                                <li>
                                    <strong>"이용자"</strong>란 본 약관에 따라 서비스를 이용하는 모든 사용자를 의미합니다.
                                </li>
                                <li>
                                    <strong>"캐릭터 정보"</strong>란 Nexon Open API를 통해 제공되는 메이플스토리
                                    캐릭터의 장비, 스탯, 전투력 등의 정보를 의미합니다.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 제3조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제3조 (서비스의 제공)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <p>서비스는 다음과 같은 내용을 제공합니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>메이플스토리 캐릭터 정보 조회 서비스</li>
                                <li>AI 기반 캐릭터 진단 및 성장 가이드</li>
                                <li>보스 성장 단계 진단 및 추천</li>
                                <li>헥사 스탯, 어빌리티, 장비 등에 대한 종합 가이드</li>
                                <li>메이플스토리 공식 뉴스 및 업데이트 정보</li>
                                <li>기타 서비스가 제공하는 부가 서비스</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제4조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제4조 (서비스의 제한)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <p>서비스는 다음 각 호의 경우 서비스 제공을 일시적으로 중단할 수 있습니다:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>서비스 설비의 보수, 점검, 교체 또는 고장, 통신의 두절 등의 사유가 발생한 경우</li>
                                <li>Nexon Open API의 장애 또는 서비스 중단이 발생한 경우</li>
                                <li>국가비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우</li>
                                <li>기타 불가항력적 사유가 있는 경우</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제5조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제5조 (데이터의 정확성 및 책임)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <p>
                                서비스는 Nexon Open API를 통해 제공되는 데이터를 기반으로 정보를 제공합니다.
                                서비스는 제공되는 정보의 정확성을 위해 최선을 다하나, 다음의 사항에 대해서는 책임을 지지 않습니다:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Nexon Open API에서 제공하는 데이터의 오류 또는 지연</li>
                                <li>AI 진단 결과는 참고 정보이며, 절대적인 정답이 아님</li>
                                <li>서비스를 이용한 의사결정에 따른 결과</li>
                                <li>메이플스토리 게임 내 변경사항으로 인한 정보의 불일치</li>
                            </ul>
                        </div>
                    </section>

                    {/* 제6조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제6조 (개인정보 보호)</h2>
                        <p className="text-slate-300 leading-relaxed">
                            서비스는 이용자의 개인정보를 보호하기 위하여 개인정보처리방침을 운영하고 있으며,
                            관련 법령을 준수합니다. 자세한 내용은
                            <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline ml-1">
                                개인정보처리방침
                            </a>
                            을 참조하시기 바랍니다.
                        </p>
                    </section>

                    {/* 제7조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제7조 (저작권 및 지적재산권)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    서비스가 제공하는 콘텐츠(가이드, 분석 로직, 디자인 등)의 저작권은 서비스에 귀속됩니다.
                                </li>
                                <li>
                                    메이플스토리 관련 모든 상표, 로고, 캐릭터 정보 등의 지적재산권은 넥슨코리아(주)에 있습니다.
                                </li>
                                <li>
                                    서비스는 Nexon Open API를 통해 제공되는 공개 데이터를 활용하며,
                                    넥슨의 지적재산권을 침해하지 않습니다.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 제8조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제8조 (면책조항)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>
                                    서비스는 천재지변, 불가항력, Nexon API 장애 등으로 인한 서비스 중단에 대해 책임을 지지 않습니다.
                                </li>
                                <li>
                                    서비스가 제공하는 AI 진단 및 가이드는 참고 자료이며, 최종 의사결정은 이용자의 책임입니다.
                                </li>
                                <li>
                                    이용자가 서비스를 통해 얻은 정보를 활용하여 발생한 손해에 대해 서비스는 책임을 지지 않습니다.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 제9조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제9조 (약관의 변경)</h2>
                        <p className="text-slate-300 leading-relaxed">
                            서비스는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며,
                            약관이 변경되는 경우 서비스 내 공지사항을 통해 공지합니다.
                            변경된 약관은 공지된 날로부터 7일 후부터 효력이 발생합니다.
                        </p>
                    </section>

                    {/* 제10조 */}
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-blue-400">제10조 (준거법 및 관할법원)</h2>
                        <div className="text-slate-300 leading-relaxed space-y-2">
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>본 약관의 해석 및 적용은 대한민국 법령을 따릅니다.</li>
                                <li>
                                    서비스 이용과 관련하여 발생한 분쟁에 대해서는 대한민국 법원을 관할 법원으로 합니다.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 부칙 */}
                    <section className="pt-8 border-t border-slate-700">
                        <h2 className="text-xl font-bold mb-4 text-slate-400">부칙</h2>
                        <p className="text-slate-400">
                            본 약관은 2024년 1월 1일부터 시행됩니다.
                        </p>
                    </section>
                </div>

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
