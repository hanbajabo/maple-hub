import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: '보스 장비 성장 로드맵 - 메이플 AI',
    description: '무자본 유저를 위한 보스 장비 세팅 9단계 가이드. 초보부터 종결까지 단계별 로드맵.',
};

const BOSS_STAGES = [
    {
        stage: 1,
        title: '입문: 도전자 세트',
        description: '넥슨이 준비한 완벽한 시작',
        equipment: ['도전자 18성 무기+방어구 (무료 지급)', '스타포스/잠재능력 세팅 완료'],
        starforce: '18성 (기본 제공)',
        potential: '에픽 (기본 제공)',
        goal: '레벨 200까지 도전자 장비로 성장 후 다음 단계 준비'
    },
    {
        stage: 2,
        title: '초급: 카루타 + 파프니르',
        description: '국민 세팅의 시작',
        equipment: ['루타비스 3세트', '파프니르 무기 (임시)', '보스 장신구'],
        starforce: '12성 (임시)',
        potential: '에픽 6% 이상',
        goal: '노말 보스 클리어, 아케인 심볼 성장'
    },
    {
        stage: 3,
        title: '중급: 아케인 12성',
        description: '요즘 대세 (앱솔 건너뛰기)',
        equipment: ['아케인셰이드 무기 (필수!)', '아케인셰이드 방어구', '보스 장신구'],
        starforce: '12성 (임시)',
        potential: '유니크 9% 이상',
        goal: '무기는 무조건 아케인! 방어구는 12성에서 멈추기 (17성 X)'
    },
    {
        stage: 4,
        title: '중상급: 여명 세트 추가',
        description: '허리 라인 강화',
        equipment: ['트와일라이트 마크', '에스텔라 이어링', '데이브레이크 펜던트', '여명의 가디언 엔젤 링'],
        starforce: '12~17성',
        potential: '유니크 15% 이상',
        goal: '여명 2세트 효과 (보공 10%)'
    },
    {
        stage: 5,
        title: '고급: 17성 아케인',
        description: '본격 고스펙',
        equipment: ['아케인셰이드 17성 (장갑/신발/망토/견장)'],
        starforce: '17성',
        potential: '레전드리 2줄 유효',
        goal: '17성 달성, 하드 보스 입문'
    },
    {
        stage: 6,
        title: '고급+: 22성 앱솔 vs 17~18성 아케인',
        description: '선택의 기로 (가성비 vs 성장성)',
        equipment: [
            '22성 앱솔 (장갑/신발/망토/견장) - 가성비 종결',
            '또는 17~18성 아케인 (장갑/신발/망토/견장) - 미래 투자',
            '22성 카루타 (모자/상의/하의) - 가성비',
            '또는 17~18성 에테르넬 (모자/상의/하의) - 성장성'
        ],
        starforce: '22성 앱솔/카루타 또는 17~18성 아케인/에테르넬',
        potential: '레전드리 2줄+',
        goal: '22성 앱솔이 당장 강하지만, 아케인은 미래를 위한 투자'
    },
    {
        stage: 7,
        title: '최고급: 칠흑/광휘 세트',
        description: '엔드게임 진입',
        equipment: ['창세의 뱃지', '저주받은 마도서', '트와일라이트 마크'],
        starforce: '18~20성 (아케인)',
        potential: '레전드리 정옵+',
        goal: '하드 보스 9보장 달성'
    },
    {
        stage: 8,
        title: '종결: 22성 아케인/에테르넬',
        description: '메이플의 정점',
        equipment: ['아케인/에테르넬 22성 풀세트'],
        starforce: '22성',
        potential: '레전드리 이탈 옵션',
        goal: '익스트림 보스 도전'
    },
    {
        stage: 9,
        title: '신의 영역',
        description: '23성 이상 달성',
        equipment: ['에테르넬 23성+'],
        starforce: '23성+',
        potential: '올이탈 / 쌍이탈',
        goal: '서버 최상위 랭커'
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
                    <p className="text-slate-400 mt-2">무자본 유저를 위한 9단계 세팅 가이드</p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">실전 검증된 성장 로드맵</div>
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
                            무자본 유저도 <strong className="text-yellow-400">시간을 투자하면</strong> 단계적으로 스펙을 올릴 수 있습니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            이 가이드는 <strong className="text-green-400">초보부터 종결까지 9단계</strong>로 나누어,
                            각 단계별로 어떤 장비를 착용하고 어느 정도 강화해야 하는지 명확하게 알려드립니다.
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-indigo-400" />
                        9단계 성장 로드맵
                    </h2>

                    <div className="space-y-6">
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
                                    {stage.stage === 9 && <Award className="w-6 h-6 text-yellow-400" />}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 mb-2">📦 장비</div>
                                        <ul className="space-y-1">
                                            {stage.equipment.map((item, idx) => (
                                                <li key={idx} className="text-sm text-slate-300">• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-500 mb-2">⭐ 스타포스</div>
                                        <p className="text-sm text-white font-bold">{stage.starforce}</p>
                                        <div className="text-xs font-bold text-slate-500 mb-2 mt-3">💎 잠재능력</div>
                                        <p className="text-sm text-white font-bold">{stage.potential}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-slate-700">
                                    <div className="text-xs font-bold text-slate-500 mb-1">🎯 목표</div>
                                    <p className="text-sm text-slate-300">{stage.goal}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁</h2>

                    <div className="space-y-4">
                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 무기는 무조건 아케인!</h4>
                            <p className="text-slate-300 text-sm">
                                파프니르는 건너뛰고 바로 <strong className="text-yellow-400">아케인셰이드 무기</strong>로!
                                요즘 대세는 앱솔 건너뛰고 아케인입니다.
                            </p>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💥 22성 앱솔 vs 17성 아케인?</h4>
                            <p className="text-slate-300 text-sm mb-2">
                                <strong className="text-yellow-400">22성 앱솔</strong>이 스타포스 공격력 <strong>+67</strong> 더 높습니다!
                            </p>
                            <p className="text-slate-300 text-sm">
                                • 22성 앱솔 = <strong className="text-green-400">가성비 종결</strong> (당장 강함)<br />
                                • 17성 아케인 = <strong className="text-blue-400">미래 투자</strong> (나중에 22성까지 키울 수 있음)
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 아케인 12성에서 멈추기!</h4>
                            <p className="text-slate-300 text-sm">
                                초반에는 아케인 방어구를 <strong className="text-yellow-400">12성</strong>까지만 강화하세요.
                                17성은 나중에 메소가 충분할 때!
                            </p>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🌟 여명 2세트 효과!</h4>
                            <p className="text-slate-300 text-sm">
                                트와일라이트 마크 + 에스텔라 이어링만 있어도 <strong className="text-yellow-400">보공 10%</strong>!
                                가성비 최고의 세팅입니다.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 장비는 몇 단계?</h3>
                    <p className="text-slate-300 mb-6">메이플 AI로 실시간 장비 진단을 받아보세요</p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
