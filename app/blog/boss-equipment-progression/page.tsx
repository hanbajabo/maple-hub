import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: '보스 장비 성장 로드맵 - 메이플 AI',
    description: '무자본 유저를 위한 보스 장비 세팅 10단계 가이드. 초보부터 종결까지 단계별 로드맵.',
};

const BOSS_STAGES = [
    {
        stage: 1,
        title: '입문: 도전자 세트',
        description: '넥슨이 준비한 완벽한 시작',
        longDescription: '메이플스토리를 처음 시작하거나 복귀한 유저라면 가장 먼저 접하게 되는 장비입니다. 하이퍼 버닝 이벤트 등을 통해 무료로 지급받을 수 있으며, 15~18성 스타포스와 유니크 잠재능력이 기본적으로 적용되어 있어 레벨 200 이후 아케인 리버 초반 지역까지 무리 없이 사냥이 가능합니다. 이 단계에서는 무리하게 메소를 쓰지 말고, 이벤트를 통해 자본을 모으는 것이 핵심입니다. 기간제인 경우가 많으므로 다음 단계 장비를 미리 준비해야 합니다.',
        equipment: ['도전자 18성 무기+방어구 (무료 지급)', '스타포스/잠재능력 세팅 완료'],
        starforce: '18성 (기본 제공)',
        potential: '에픽 (기본 제공)',
        goal: '레벨 200까지 도전자 장비로 성장 후 다음 단계 준비'
    },
    {
        stage: 2,
        title: '초급: 카루타 + 파프니르',
        description: '국민 세팅의 시작',
        longDescription: '본격적인 보스 레이드를 위한 첫 걸음입니다. 루타비스 세트(카루타)는 메이플스토리의 교복과도 같은 장비로, 저렴한 가격에 뛰어난 세트 효과를 제공합니다. 특히 상의와 하의는 엔드게임까지도 사용되는 경우가 많으므로, 추후 고자본 세팅으로 넘어갈 때도 버리지 않고 22성 강화를 시도할 수 있습니다. 무기는 파프니르를 잠시 사용하다가 빠르게 아케인셰이드로 넘어가는 추세입니다.',
        equipment: ['루타비스 3세트 (모자/상의/하의)', '파프니르 무기 (임시)', '보스 장신구 9세트'],
        starforce: '10~12성 (임시)',
        potential: '에픽 6% ~ 9%',
        goal: '노말 보스(스우, 데미안) 클리어 및 아케인 심볼 성장'
    },
    {
        stage: 3,
        title: '중급: 아케인 12성',
        description: '요즘 대세 (앱솔 건너뛰기)',
        longDescription: '과거에는 앱솔랩스 장비를 거쳐가는 것이 정석이었으나, 최근에는 아케인셰이드 장비의 가격이 많이 내려가면서 바로 아케인으로 넘어가는 것이 효율적입니다. 아케인셰이드 무기는 파프니르나 앱솔랩스에 비해 기본 공격력이 월등히 높기 때문에, 스타포스가 낮더라도 훨씬 강력한 위력을 발휘합니다. 방어구 또한 세트 효과가 우수하므로 12성 정도만 맞춰도 충분한 성능을 냅니다.',
        equipment: ['아케인셰이드 무기 (필수!)', '아케인셰이드 방어구 (장갑/신발/망토/견장)', '보스 장신구'],
        starforce: '12성 (가성비 구간)',
        potential: '유니크 9% ~ 15%',
        goal: '무기는 무조건 아케인! 방어구는 12성에서 멈추고 메소를 모으세요.'
    },
    {
        stage: 4,
        title: '중상급: 여명 세트 추가',
        description: '허리 라인 강화',
        longDescription: '보스 장신구 세트에서 한 단계 업그레이드하는 구간입니다. 트와일라이트 마크, 에스텔라 이어링, 가디언 엔젤 링 등 여명 세트는 칠흑 세트 바로 아래 단계의 준종결 아이템입니다. 특히 2세트 효과로 보스 몬스터 공격력 데미지 10%를 챙길 수 있어 가성비가 매우 훌륭합니다. 이 단계부터는 장신구의 잠재능력도 유니크 이상으로 맞춰주는 것이 좋습니다.',
        equipment: ['트와일라이트 마크', '에스텔라 이어링', '데이브레이크 펜던트', '여명의 가디언 엔젤 링'],
        starforce: '17성 (강화권 활용)',
        potential: '유니크 15% ~ 레전드리',
        goal: '여명 2세트 효과 (보공 10%) 확보 및 장신구 스펙업'
    },
    {
        stage: 5,
        title: '고급: 17성 아케인',
        description: '본격 고스펙',
        longDescription: '이제 아케인셰이드 장비의 잠재력을 끌어올릴 때입니다. 17성 강화권을 활용하거나 이벤트를 통해 모든 아케인 방어구를 17성까지 강화합니다. 이 구간이 되면 하드 보스 파티격에 참여할 수 있는 최소한의 스펙이 갖춰집니다. 잠재능력 또한 레전드리 등급으로 올려 주스탯 2줄 이상을 확보해야 합니다.',
        equipment: ['아케인셰이드 17성 (장갑/신발/망토/견장)'],
        starforce: '17성 (필수)',
        potential: '레전드리 2줄 유효 (주스탯 21% 이상)',
        goal: '전 부위 17성 달성, 하드 보스(루시드, 윌) 입문'
    },
    {
        stage: 6,
        title: '고급+: 22성 앱솔 vs 17~18성 아케인',
        description: '선택의 기로 (가성비 vs 성장성)',
        longDescription: '메이플스토리 유저들의 영원한 난제입니다. 22성 앱솔랩스는 스타포스로 인한 공격력 상승량이 높아 당장의 성능은 17성 아케인보다 좋습니다. 하지만 추후 22성 아케인으로 넘어갈 때 아이템을 다시 맞춰야 한다는 단점이 있습니다. 반면 아케인셰이드는 18성, 19성으로 차근차근 스펙업이 가능하며 최종적으로 22성까지 바라볼 수 있습니다. 본인의 자본 상황과 성향에 맞춰 선택하세요.',
        equipment: [
            '22성 앱솔 (장갑/신발/망토/견장) - 가성비 종결',
            '또는 17~18성 아케인 (장갑/신발/망토/견장) - 미래 투자',
            '22성 카루타 (모자/상의/하의) - 가성비',
            '또는 17~18성 에테르넬 (모자/상의/하의) - 성장성'
        ],
        starforce: '22성 앱솔/카루타 또는 17~18성 아케인/에테르넬',
        potential: '레전드리 2줄+ (27% 이상)',
        goal: '22성 앱솔이 당장 강하지만, 아케인은 미래를 위한 투자입니다.'
    },
    {
        stage: 7,
        title: '최고급: 칠흑/광휘 세트',
        description: '엔드게임 진입',
        longDescription: '메이플스토리의 최상위 아이템인 칠흑의 보스 세트를 하나씩 맞추는 단계입니다. 창세의 뱃지, 저주받은 마도서, 마력이 깃든 안대 등은 획득 난이도가 매우 높지만 그만큼 강력한 성능과 세트 효과를 제공합니다. 이 단계부터는 아이템 하나하나의 가격이 천문학적으로 올라가므로 신중한 투자가 필요합니다.',
        equipment: ['창세의 뱃지', '저주받은 마도서', '트와일라이트 마크', '마력이 깃든 안대'],
        starforce: '18~22성 (자본에 따라)',
        potential: '레전드리 3줄 유효 (30% 이상)',
        goal: '하드 보스 솔플 및 칠흑 세트 효과 활성화'
    },
    {
        stage: 8,
        title: '종결: 22성 아케인/에테르넬',
        description: '메이플의 정점',
        longDescription: '사실상 일반적인 유저가 도달할 수 있는 스펙의 끝입니다. 모든 아케인셰이드 및 에테르넬 장비를 22성까지 강화하고, 잠재능력 또한 30% 이상으로 도배합니다. 이 스펙이면 검은 마법사를 포함한 대부분의 보스를 여유롭게 격파할 수 있으며, 해방 퀘스트 또한 수월하게 진행할 수 있습니다.',
        equipment: ['아케인/에테르넬 22성 풀세트'],
        starforce: '22성 (졸업)',
        potential: '레전드리 이탈 옵션 (33%~36%)',
        goal: '익스트림 보스 도전 및 제네시스 무기 해방'
    },
    {
        stage: 9,
        title: '신의 영역',
        description: '23성 이상 달성',
        longDescription: '이론상으로만 존재하는 줄 알았던 영역입니다. 23성 강화는 성공 확률이 3%에 불과하며 실패 시 아이템이 파괴될 확률이 매우 높습니다. 이 단계에 도달한 유저는 전 서버를 통틀어 손에 꼽을 정도이며, 그야말로 메이플스토리의 "신"이라고 불릴 자격이 있습니다.',
        equipment: ['에테르넬 23성+'],
        starforce: '23성+ (신화)',
        potential: '올이탈 / 쌍이탈 (36% 이상)',
        goal: '서버 최상위 랭커 등극'
    },
    {
        stage: 10,
        title: '최종 완성: 22성급 장신구 세팅',
        description: '환산주스탯 8만 돌파',
        longDescription: '방어구까지 22성 세팅을 완료했다면 이제 장신구에서 22성까지 맞춰 환산주스탯 8만 이상의 세팅을 완성할 수 있습니다. 장신구는 방어구보다 스타포스 파괴 확률이 높아 더욱 신중하게 강화해야 하지만, 그만큼 강력한 스펙 상승량을 제공합니다. 2여명 + 4칠흑 이상의 세트 조합을 챙기며, 엔드급 세팅은 칠흑 세트와 광휘 세트를 섮어서 사용합니다.',
        equipment: ['눈장식, 얼굴장식, 귀고리, 펜던트 22성', '벨트 22성 (타일런트/놀장강 12성)', '기계 심장 20성', '반지 22성 (이벤트링 제외)', '특수링 (리레, 컨티, 웨폰, 리커)'],
        starforce: '기계심장 20성, 나머지 22성 (타일런트/놀장강 12성)',
        potential: '레전드리 주스탯 30% 이상',
        goal: '2여명 + 4칠흑 세트 효과, 환산주스탯 8만 돌파'
    }
];

export default function BossEquipmentProgressionPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">보스 장비 성장 로드맵</h1>
                    <p className="text-slate-400 mt-2">무자본 유저를 위한 10단계 세팅 가이드</p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">실전 검증된 성장 로드맵 · 2025년 업데이트</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            보스 장비 성장이란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            메이플스토리에서 <strong className="text-white">보스 장비 세팅</strong>은 캐릭터 성장의 핵심입니다.
                            단순히 좋은 장비를 사는 것이 아니라, 자신의 자본 상황과 목표에 맞춰 단계적으로 장비를 업그레이드하는 것이 중요합니다.
                            무자본 유저도 <strong className="text-yellow-400">올바른 로드맵</strong>을 따른다면 충분히 최상위 보스에 도전할 수 있습니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            이 가이드는 <strong className="text-green-400">초보부터 종결까지 10단계</strong>로 나누어,
                            각 단계별로 어떤 장비를 착용하고 어느 정도 강화해야 하는지 명확하게 알려드립니다.
                            특히 최근 메타인 <strong className="text-indigo-400">아케인셰이드 직행 빌드</strong>를 중심으로 설명합니다.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        10단계 성장 로드맵 상세 가이드
                    </h2>

                    <div className="space-y-8">
                        {BOSS_STAGES.map((stage) => (
                            <div key={stage.stage} className={`bg-slate-800/40 border rounded-xl p-6
                ${stage.stage === 9 ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20' :
                                    stage.stage >= 7 ? 'border-purple-500/30' :
                                        stage.stage >= 5 ? 'border-blue-500/30' : 'border-slate-700'}`}>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg
                      ${stage.stage === 9 ? 'bg-yellow-500/20 text-yellow-300' :
                                                stage.stage >= 7 ? 'bg-purple-500/20 text-purple-300' :
                                                    stage.stage >= 5 ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                                            {stage.stage}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                                            <p className="text-sm text-slate-400">{stage.description}</p>
                                        </div>
                                    </div>
                                    {stage.stage === 10 && <Award className="w-6 h-6 text-green-400" />}
                                    {stage.stage === 9 && <Award className="w-6 h-6 text-yellow-400" />}
                                </div>

                                {/* 상세 설명 추가 */}
                                <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        {stage.longDescription}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 mb-2">📦 추천 장비 구성</div>
                                        <ul className="space-y-1">
                                            {stage.equipment.map((item, idx) => (
                                                <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                                                    <span className="text-slate-500 mt-1">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 mb-2">⭐ 권장 스타포스</div>
                                            <p className="text-sm text-white font-bold">{stage.starforce}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-500 mb-2">💎 권장 잠재능력</div>
                                            <p className="text-sm text-white font-bold">{stage.potential}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="text-xs font-bold text-slate-500 mb-1">🎯 이 단계의 목표</div>
                                    <p className="text-sm text-slate-300">{stage.goal}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁 & 전략</h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">✅ 무기는 무조건 아케인!</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                과거에는 파프니르 무기나 앱솔랩스 무기를 거쳐가는 것이 일반적이었습니다. 하지만 현재 메이플스토리 경제 상황상 아케인셰이드 무기의 가격이 매우 저렴해졌습니다.
                                <br /><br />
                                아케인셰이드 무기는 기본 공격력/마력이 월등히 높기 때문에, 스타포스가 낮더라도(10~12성) 17성 앱솔랩스 무기보다 강력한 성능을 발휘합니다.
                                따라서 <strong className="text-yellow-400">무기는 파프니르/앱솔랩스를 건너뛰고 바로 아케인셰이드</strong>를 구매하는 것이 가장 효율적인 선택입니다.
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">💥 22성 앱솔 vs 17성 아케인?</h4>
                            <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                                많은 유저들이 고민하는 구간입니다. 결론부터 말씀드리면 <strong className="text-yellow-400">가성비는 22성 앱솔, 성장성은 17성 아케인</strong>입니다.
                            </p>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400">•</span>
                                    <span><strong>22성 앱솔랩스:</strong> 스타포스로 인한 공격력 상승량이 높아 당장의 데미지는 더 강력합니다. 가격도 비교적 저렴하여 중자본 유저에게 인기가 많습니다. 하지만 추후 스펙업 시 장비를 버려야 합니다.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-orange-400">•</span>
                                    <span><strong>17성 아케인셰이드:</strong> 당장의 성능은 22성 앱솔보다 약간 낮을 수 있지만, 추후 18성, 21성, 22성으로 강화하며 계속 사용할 수 있습니다. 장기적으로 본다면 아케인셰이드를 선택하는 것이 중복 투자를 막는 길입니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2 text-lg">💡 아케인 12성에서 멈추기!</h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                아케인셰이드 방어구는 기본 스펙이 훌륭합니다. 무리해서 17성을 달려고 하지 마세요.
                                초반에는 <strong className="text-yellow-400">10~12성</strong> 정도만 강화해서 사용해도 충분히 강력합니다.
                                그 돈을 모아 무기 잠재능력을 맞추거나, 보조무기/엠블렘 스펙업에 투자하는 것이 전체적인 데미지 상승에 더 도움이 됩니다.
                                17성 강화는 '1516 이벤트'나 '샤이닝 스타포스' 이벤트를 활용하세요.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-16 border-t border-slate-700 pt-12">
                        <h2 className="text-3xl font-bold text-white mb-8">자주 묻는 질문 (FAQ)</h2>

                        <div className="space-y-6">
                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 보스 장신구 세트는 언제까지 쓰나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 보스 장신구 9세트 효과는 매우 강력하여, 꽤 오랫동안 사용하게 됩니다. 보통 '여명 세트'를 맞추기 전까지는 계속 사용한다고 보시면 됩니다.
                                    특히 <strong className="text-white">응축된 힘의 결정석, 아쿠아틱 레터 눈장식</strong> 등은 가성비가 좋아 고스펙 유저들도 부캐릭터에 자주 사용합니다.
                                    여명 세트로 넘어갈 때는 세트 효과가 깨지지 않도록 주의하며 하나씩 교체하는 것이 좋습니다.
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 잠재능력은 어떤 옵션을 챙겨야 하나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 부위별로 챙겨야 할 옵션이 다릅니다.
                                    <br />• <strong>무기/보조/엠블렘 (무보엠):</strong> 공격력/마력 %, 보스 몬스터 공격 시 데미지 %, 방어율 무시 %
                                    <br />• <strong>장갑:</strong> 크리티컬 데미지 % (가장 중요!)
                                    <br />• <strong>모자:</strong> 쿨타임 감소 (직업에 따라 다름) 또는 주스탯 %
                                    <br />• <strong>나머지 방어구/장신구:</strong> 주스탯 % (STR, DEX, INT, LUK 중 본인 직업에 맞는 스탯)
                                </p>
                            </div>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-orange-400 mb-2">Q. 추가옵션(추옵)은 얼마나 맞춰야 하나요?</h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    A. 장비 레벨에 따라 다릅니다.
                                    <br />• <strong>150제 (카루타):</strong> 80~100급 이상
                                    <br />• <strong>160제 (앱솔랩스):</strong> 100~120급 이상
                                    <br />• <strong>200제 (아케인셰이드):</strong> 120~140급 이상
                                    <br />
                                    여기서 '급'이란 (주스탯 + 공격력*4 + 올스탯%*10)으로 계산된 수치를 말합니다. 무기의 경우 1추옵 또는 2추옵을 사용하는 것이 정신 건강에 좋습니다.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 장비는 몇 단계?</h3>
                    <p className="text-slate-300 mb-6">메이플 AI로 실시간 장비 진단을 받아보세요. 현재 착용한 장비의 가치를 정확하게 분석해드립니다.</p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 무료로 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
