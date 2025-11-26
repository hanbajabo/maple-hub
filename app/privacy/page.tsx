import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-300 p-6 sm:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link href="/" className="text-maple-orange hover:underline font-bold text-lg">
                        ← 메인으로 돌아가기
                    </Link>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white mb-8 border-b border-slate-800 pb-4">
                    개인정보처리방침
                </h1>

                <div className="space-y-8 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">1. 개인정보의 처리 목적</h2>
                        <p>
                            '메이플 AI'(이하 '회사')는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                        </p>
                        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                            <li>서비스 제공: 메이플스토리 캐릭터 정보 조회 및 분석 서비스 제공</li>
                            <li>서비스 개선: 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">2. 수집하는 개인정보의 항목 및 수집방법</h2>
                        <p>회사는 별도의 회원가입 없이 서비스를 제공하며, 사용자가 입력하는 '캐릭터 닉네임' 외에 민감한 개인정보를 서버에 저장하지 않습니다.</p>
                        <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                            <li>수집 항목: 접속 로그, 쿠키, 접속 IP 정보, 캐릭터 닉네임(조회 시)</li>
                            <li>수집 방법: 서비스 이용 과정에서 자동 생성되어 수집</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">3. 쿠키(Cookie)의 운용 및 거부</h2>
                        <p>
                            회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
                        </p>
                        <div className="mt-2 bg-slate-900 p-4 rounded-lg border border-slate-800">
                            <p className="font-bold text-maple-orange mb-2">[구글 애드센스 광고]</p>
                            <p className="text-sm">
                                본 사이트는 구글 애드센스 광고를 송출합니다. 구글과 구글의 파트너사는 이용자의 본 사이트나 다른 웹사이트 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(DART 쿠키 등)를 사용할 수 있습니다.
                                이용자는 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">광고 설정</a>을 통해 맞춤형 광고 설정을 해제할 수 있습니다.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">4. 넥슨 오픈 API 사용 고지</h2>
                        <p>
                            본 서비스는 넥슨 오픈 API(NEXON Open API)를 활용하여 개발되었습니다.
                            제공되는 데이터의 저작권 및 소유권은 넥슨코리아(NEXON Korea Corporation)에 있으며, 데이터의 정확성을 보장하지 않습니다.
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            Data based on NEXON Open API
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-white mb-3">5. 개인정보 보호책임자</h2>
                        <p>서비스 이용과 관련된 개인정보 침해 신고나 상담이 필요한 경우에는 아래의 연락처로 문의하시기 바랍니다.</p>
                        <p className="mt-2">이메일: (이메일 주소를 입력해주세요)</p>
                    </section>

                    <div className="pt-8 border-t border-slate-800 text-sm text-slate-500">
                        <p>공고일자: 2025년 11월 26일</p>
                        <p>시행일자: 2025년 11월 26일</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
