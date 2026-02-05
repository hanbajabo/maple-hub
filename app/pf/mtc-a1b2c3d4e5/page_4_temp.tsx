{/* PAGE 4: 콘텐츠 구조 설계 (Tiered Structure) */ }
<div className="a4-page">
    <div className="border-b-2 border-gray-900 pb-3 mb-6 flex justify-between items-end">
        <h2 className="text-3xl font-bold text-black">콘텐츠 구조 설계 (Tiered Structure)</h2>
        <span className="text-gray-500 text-sm">04 / 07</span>
    </div>

    <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded-r mb-8">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">🎯 설계 목표: "넓은 보스 풀, 깊이 있는 학습 경험"</h3>
        <p className="text-sm text-indigo-800">개발 리소스를 선택과 집중하여 효율을 극대화하고, 유저 숙련도별로 차별화된 경험을 제공합니다.</p>
    </div>

    <div className="grid grid-cols-1 gap-6">
        {/* Tier 1 */}
        <div className="flex bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-100 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-1">Tier 1</h4>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold">기본 훈련존</span>
            </div>
            <div className="p-4 flex-1 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1 uppercase">Target Boss</p>
                    <p className="font-bold text-gray-900">스우, 데미안, 루시드, 윌</p>
                    <p className="text-xs text-gray-500 mt-1">메이플 용사의 70%가 머무르는 구간</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1 uppercase">Key Features</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        <li>팬텀 리플레이 (고정 1종)</li>
                        <li>고스트 ON/OFF</li>
                        <li>즉시 재도전 (대기시간 0)</li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-50 p-4 w-32 flex justify-center items-center text-center border-l border-gray-200">
                <p className="text-xs font-bold text-gray-600">"유저 풀 확장<br />진입장벽 제거"</p>
            </div>
        </div>

        {/* Tier 2 (강조) */}
        <div className="flex bg-indigo-50 rounded-xl border-2 border-indigo-500 overflow-hidden shadow-lg transform scale-105 z-10">
            <div className="bg-indigo-600 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-indigo-700">
                <h4 className="text-xl font-bold text-white mb-1">Tier 2</h4>
                <span className="text-xs bg-indigo-700 text-indigo-100 px-2 py-0.5 rounded-full font-bold">숙련 훈련존</span>
                <span className="text-[10px] text-yellow-300 mt-1 font-bold">★ BM Core</span>
            </div>
            <div className="p-5 flex-1 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-bold text-indigo-400 mb-1 uppercase">Target Boss</p>
                    <p className="font-bold text-gray-900 text-lg">진 힐라, 검은 마법사, 세렌</p>
                    <p className="text-xs text-indigo-700 mt-1">본격적인 패턴 공략이 요구되는 최상위 관문</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-indigo-400 mb-1 uppercase">Key Features</p>
                    <ul className="text-sm text-gray-900 list-disc list-inside font-bold">
                        <li>시나리오 랜덤 매칭 (3~5종)</li>
                        <li>직업별 무브먼트 매칭</li>
                        <li>스마트 택티컬 내비 (Lv 1/2)</li>
                        <li>페이즈 셀렉터 (취약점 집중)</li>
                    </ul>
                </div>
            </div>
            <div className="bg-white p-4 w-32 flex justify-center items-center text-center border-l border-indigo-200">
                <p className="text-xs font-bold text-indigo-700">"돈 낼 가치가<br />있는 실질적 효용"</p>
            </div>
        </div>

        {/* Tier 3 */}
        <div className="flex bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-100 p-4 w-32 flex flex-col justify-center items-center text-center border-r border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-1">Tier 3</h4>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full font-bold">시범 훈련존</span>
            </div>
            <div className="p-4 flex-1 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1 uppercase">Target Boss</p>
                    <p className="font-bold text-gray-900">이지 칼로스 / 카링 등</p>
                    <p className="text-xs text-gray-500 mt-1">최신 보스 및 신규 패턴 실험</p>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 mb-1 uppercase">Key Features</p>
                    <ul className="text-sm text-gray-700 list-disc list-inside">
                        <li>팬텀 리플레이 (기본)</li>
                        <li>고정 시나리오</li>
                        <li>최소한의 내비게이션</li>
                    </ul>
                </div>
            </div>
            <div className="bg-gray-50 p-4 w-32 flex justify-center items-center text-center border-l border-gray-200">
                <p className="text-xs font-bold text-gray-600">"학습 수요<br />선제 대응 (Pilot)"</p>
            </div>
        </div>
    </div>
</div>
