"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, Star, Zap, Layers, Sword, AlertTriangle, CheckCircle2 } from "lucide-react";
import { TotalCheckupResult } from "@/lib/diagnosis/total-checkup";

interface TotalDiagnosisModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: TotalCheckupResult;
    userName: string;
    equipment: any[];
}

// Typewriter Hook
const useTypewriter = (text: string, speed: number = 30) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i >= text.length) {
                clearInterval(timer);
                return;
            }

            if (text[i] === '<') {
                const tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    i = tagEnd + 1;
                } else {
                    i++;
                }
            } else {
                i++;
            }

            setDisplayedText(text.slice(0, i));
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed]);

    return displayedText;
};

const StarforceCommentary = ({ avg, count22, count25Plus }: { avg: number, count22: number, count25Plus: number }) => {
    const [content, setContent] = useState<{ title: React.ReactNode, sub: React.ReactNode, text: string } | null>(null);

    useEffect(() => {
        const pick = (opts: string[]) => opts[Math.floor(Math.random() * opts.length)];

        let newContent = null;

        if (count25Plus > 0) {
            newContent = {
                title: (
                    <div className="flex justify-center items-center gap-2 text-2xl">
                        <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                        <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-orange-400">
                            신화 그 자체
                        </span>
                        <Star className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-pulse" />
                    </div>
                ),
                sub: (
                    <p className="text-yellow-300 font-bold text-lg">
                        🌟 평균 스타포스가 <span className="text-2xl text-yellow-200">{avg}성</span>... 말이 됩니까?!
                    </p>
                ),
                text: pick([
                    "단풍이 AI 시스템 과부하... 측정 불가... 당신은 <b>신</b>입니다. 💎",
                    "메이플스토리 섭종할 때까지 회자될 <b>전설 중의 전설</b>! 👑",
                    "이건 강화가 아니라 <b>창조</b>입니다. 메이플 월드의 절대자시여... 🙇‍♂️",
                    "운영자님! 여기 <b>25성</b>이 있습니다! 본사로 모셔가세요! 🚨",
                    "당신의 장비창을 보는 것만으로도 영광입니다. 성지순례 왔습니다. 🙏",
                    "이 장비들은 박물관이 아니라 <b>신전</b>에 모셔야 합니다. 🏛️",
                    "당신의 스타포스 수치가 제 연산 능력을 초과했습니다. <b>ERROR: TOO AWESOME.</b> 🤖💥",
                    "메이플 월드의 진정한 주인은 검은 마법사가 아니라 <b>당신</b>이었습니다. 🌑",
                    "혹시 넥슨 본사 지하에 갇혀서 강화만 하고 계신 건 아니죠? (구조 요청 바람) 🆘",
                    "25성... 이 숫자를 보기 위해 저는 태어난 것 같습니다. 감격스럽습니다. 😭",
                    "메이플 운영진이 당신을 주시하고 있습니다. (농담 아님) 👀",
                    "이 장비들은 문화재로 지정해야 합니다. 국보 제 1호! 🇰🇷",
                    "당신의 강화 버튼은 '성공'만 있는 건가요? 비결 좀 알려주세요. 🤫",
                    "전 우주가 당신의 강화를 도왔습니다. 원기옥 스펙! 🌍🙌",
                    "이제 더 이상 올라갈 곳이 없습니다. 메이플의 끝을 보셨군요. 🏔️"
                ])
            };
        } else if (avg >= 24) {
            newContent = {
                title: (
                    <span className="text-purple-400 font-bold text-lg flex items-center justify-center gap-2">
                        <Star className="w-6 h-6 fill-purple-400 animate-spin-slow" /> 초월자의 경지!
                    </span>
                ),
                sub: (
                    <p className="text-purple-300">
                        평균 <span className="text-2xl font-black text-white">{avg}성</span>... 사람이 아니무니다. 👽
                    </p>
                ),
                text: pick([
                    "24성이라니... 당신은 혹시 메이플 월드의 <b>창조주</b>이신가요? 🌌",
                    "이 수치는 버그가 아닙니다. <b>기적</b>입니다. 모두 경배하라! 🙌",
                    "검은 마법사도 당신 장비 보고 도망가겠습니다. 압도적입니다. ⚔️",
                    "전 서버 랭킹 1위를 노려볼 만한 미친 스펙입니다. 대단합니다! 🏆",
                    "24성... 확률표를 해킹하신 건가요? 믿을 수 없는 수치입니다. 💻",
                    "당신의 운은 우주를 뚫고 나갔습니다. 로또 1등보다 어렵다는 그 스펙! 🌠",
                    "지나가던 초보자가 보고 기절할 스펙입니다. 구급차 불러주세요! 🚑",
                    "이 정도면 보스 몬스터들이 알아서 아이템을 바치고 도망가겠는데요? 🐉💨",
                    "강화 버튼을 누를 때마다 손이 떨리지 않으셨나요? <b>강심장</b> 인정합니다. ❤️‍🔥",
                    "24성... 제 눈을 의심했습니다. 모니터를 닦고 다시 봐도 24성이네요. 👓",
                    "이 정도면 보스들이 당신을 보고 '살려주세요'라고 외칠 겁니다. 😱",
                    "확률이라는 개념을 초월하셨군요. 당신은 확률의 지배자! 🎲",
                    "길드원들이 당신을 '신'이라고 부르지 않나요? 숭배합니다. 🙏",
                    "메이플 역사책에 한 페이지를 장식할 위대한 업적입니다. 📖"
                ])
            };
        } else if (avg >= 23) {
            newContent = {
                title: (
                    <span className="text-green-400 font-bold text-lg flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 fill-green-400" /> 전설급 스타포스!
                    </span>
                ),
                sub: (
                    <p className="text-green-300">
                        평균 <span className="text-2xl font-black text-yellow-300">{avg}성</span>이면 이미 졸업급입니다! 🎓
                    </p>
                ),
                text: pick([
                    "23성...?! 이건 단순한 장비가 아닙니다. <b>신의 권능</b>이 깃들었습니다. ✨",
                    "운영자님도 놀라서 뒷목 잡을 스펙! <b>전설의 시작</b>입니다. 😲",
                    "이 정도면 끝판왕 스펙입니다. 메이플 월드에서 당신을 막을 자는 없습니다! 🛡️",
                    "당신의 강화 운은 대체 어디까지인가요? 경이롭습니다. 🍀",
                    "23성이라니, 별들이 당신을 사랑하나 봅니다. ⭐💖",
                    "이 장비 하나면 마을에서 인기도 100개는 기본으로 받겠어요. 👍",
                    "당신의 스펙은 '탈인간'급입니다. 이제 신계로 진입하셨군요. 👼",
                    "22성을 넘어서는 용기! 그 용기에 경의를 표합니다. 🦁",
                    "서버 랭킹 게시판에서 뵙겠습니다. 존경합니다 형님! 🙇",
                    "23성이라니, 꿈에서나 보던 숫자가 현실이 되었군요. 💤✨",
                    "당신의 담력은 세계 제일! 파괴를 두려워하지 않는 용기! 🦁",
                    "이 장비의 가치는 메소로 환산할 수 없습니다. 부르는 게 값! 💰",
                    "서버의 자랑, 메이플의 보배! 당신은 진정한 하이엔드 유저입니다. 💎",
                    "23성의 영롱한 빛이 모니터를 뚫고 나옵니다. 눈이 부셔요! 😎"
                ])
            };
        } else if (avg >= 22) {
            newContent = {
                title: (
                    <span className="text-green-400 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> 완벽한 22성 세팅!
                    </span>
                ),
                sub: (
                    <p className="text-green-300">
                        평균 <span className="text-xl font-black">{avg}성</span> 달성! 22성 아이템이 <span className="font-bold">{count22}개</span>입니다.
                    </p>
                ),
                text: pick([
                    "메이플의 정점, <b>22성</b>! 이제 당신이 걸어가는 길이 곧 역사입니다. 📜",
                    "완벽함 그 자체! 더 이상 손댈 곳이 없는 <b>예술 작품</b>입니다. 🎨",
                    "별들이 춤을 추네요. 완벽한 22성, 축하드립니다! 🎉",
                    "노력과 운의 결실, 22성! 정말 고생 많으셨습니다. 👏",
                    "스타포스는 졸업입니다. 이제 23성에 도전해보실 건가요? (농담입니다) 😉",
                    "22성, 깔끔하고 완벽합니다. 더할 나위 없는 최고의 선택! 👌",
                    "졸업을 진심으로 축하드립니다! 이제 편안하게 메이플을 즐기세요. ☕",
                    "22성 풀세트... 모든 메이플 유저들의 로망을 실현하셨군요. 😍",
                    "이 영롱한 초록색 숫자들을 보세요. 마음이 정화됩니다. 🌿",
                    "당신의 끈기와 노력에 박수를 보냅니다. 22성은 아무나 하는 게 아니죠. 👏👏",
                    "22성, 그 완벽한 균형미. 보기만 해도 배가 부릅니다. 🍚",
                    "졸업을 축하합니다! 이제 스타포스 스트레스에서 해방되셨군요. 🕊️",
                    "어디 내놔도 부끄럽지 않은 최상급 스펙! 당당하게 어깨 펴세요. 💪",
                    "22성 풀셋, 모든 용사님들의 워너비 스펙을 달성하셨습니다. 🌟",
                    "이제 스타포스 창은 닫아두셔도 좋습니다. 충분히 강하니까요. 🔒"
                ])
            };
        } else if (avg >= 21) {
            newContent = {
                title: (
                    <span className="text-cyan-400 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" /> 거의 완성!
                    </span>
                ),
                sub: (
                    <p className="text-cyan-300">
                        평균 <span className="text-xl font-black">{avg}성</span>! 22성 졸업이 눈앞입니다.
                    </p>
                ),
                text: pick([
                    "남은 아이템만 22성으로 올리면 완벽합니다! 조금만 더 화이팅! 💪",
                    "22성 고지가 눈앞입니다. 마지막 한 걸음을 내딛어보세요! 🏃‍♂️",
                    "거의 다 왔습니다! 21성의 저주를 풀고 22성으로 갑시다! 🔥",
                    "21성... 22성이 코앞인데 참기 힘드시죠? 그 마음 이해합니다. 😫",
                    "정말 아깝습니다! 딱 한 번만 더 성공하면 졸업인데... (악마의 속삭임) 😈",
                    "21성도 충분히 훌륭합니다. 하지만 당신의 눈은 22성을 향해 있군요. 👀",
                    "조금만 더 힘내세요! 고지가 눈앞입니다. 할 수 있다! 🚩",
                    "21성의 저주? 아니요, 22성으로 가는 디딤돌일 뿐입니다. 🪜"
                ])
            };
        } else if (avg >= 17) {
            newContent = {
                title: (
                    <span className="text-blue-400 font-bold flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> 국민 세팅(17~18성) 구간입니다.
                    </span>
                ),
                sub: (
                    <p className="text-blue-300">
                        평균 <span className="text-xl font-black">{avg}성</span>이면 안정적인 스펙입니다!
                    </p>
                ),
                text: pick([
                    "이제 22성을 향해 도전해보세요! 천천히 올리시면 됩니다. 🎯",
                    "가장 효율적인 17성 구간입니다. 이제 22성을 향해 한 걸음씩 나아가볼까요? 🚀",
                    "탄탄한 기본기! 17성으로도 충분히 강력하지만, 당신의 잠재력은 더 높습니다. 📈",
                    "가성비와 성능을 모두 잡으셨군요. 다음 목표는 22성입니다! ⭐",
                    "18성 둘둘! 이제 하드 보스 파티격도 충분히 노려볼 만합니다. ⚔️",
                    "가성비의 제왕! 여기서 멈춰도 좋지만, 욕심이 난다면 22성의 세계로 오세요. 😈",
                    "안정적인 스펙입니다. 하지만 진정한 용사는 여기서 멈추지 않죠? 🛡️",
                    "메이플을 가장 즐겁게 즐길 수 있는 구간입니다. 스펙업의 재미를 느껴보세요! 🎵",
                    "혹시 21성 도전을 고민 중이신가요? 스타포스 이벤트 때를 노려봅시다! 📅",
                    "17성, 가성비의 정점! 하지만 18성의 유혹이 들려오지 않나요? 👂",
                    "국민 세팅 완료! 이제 상위 보스를 향해 도약할 준비가 되셨습니다. 🦋",
                    "18성 둘둘하면 검은 마법사도... 아, 아직은 아니군요. 그래도 강합니다! 🥊",
                    "스타포스 이벤트가 기다려지시죠? 그때가 바로 기회입니다. 🗓️",
                    "천천히, 하지만 확실하게! 당신의 스펙업을 응원합니다. 🐢"
                ])
            };
        } else if (avg >= 15) {
            newContent = {
                title: (
                    <span className="text-orange-400 font-bold flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> 17성까지 얼마 안 남았습니다!
                    </span>
                ),
                sub: (
                    <p className="text-orange-300">
                        평균 <span className="text-xl font-black">{avg}성</span> - 17성 안착을 응원합니다! 🚩
                    </p>
                ),
                text: pick([
                    "15성... 17성까지 딱 두 걸음 남았습니다! 힘내세요! 🏃‍♂️",
                    "17성 코앞입니다. 스타포스 이벤트 때 17성 강화권을 노려보세요! 🎫",
                    "가장 애매하지만 가장 중요한 구간! 17성 안착을 응원합니다. 🚩",
                    "15성도 훌륭하지만, 17성의 성능 향상 폭이 큽니다. 조금만 더! 📈",
                    "파괴 방지가 없는 15성 이상 구간... 용기가 필요합니다. 화이팅! 🦁",
                    "여기서 멈추면 스펙업이 정체됩니다. 과감하게 17성으로! 🔥",
                    "16성에서 미끄러져도 좌절 금지! 17성은 인내의 열매입니다. 🍒",
                    "15성 둘둘, 이제 '메린이' 티는 벗으셨군요. 진정한 용사로 거듭날 시간! ⚔️"
                ])
            };
        } else if (avg >= 12) {
            newContent = {
                title: (
                    <span className="text-orange-400 font-bold flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> 스타포스 강화가 필요합니다.
                    </span>
                ),
                sub: (
                    <p className="text-orange-300">
                        평균 <span className="text-xl font-black">{avg}성</span> - 17성 둘둘부터 시작해봅시다!
                    </p>
                ),
                text: pick([
                    "스타포스는 스펙의 기본입니다. 하나씩 17성으로 올려보세요! 🌱",
                    "17성까지만 올려도 캐릭터가 훨씬 강해질 거예요. 화이팅! 👊",
                    "아직 잠재력이 폭발하기 전입니다. 17성 강화를 목표로 삼아보세요. 🆙",
                    "12성에서 멈추면 아쉽습니다. 15성을 목표로 달려봅시다! 🏃",
                    "17성 강화권을 쓰고 싶은 충동... 참으셔야 합니다. (아니면 쓰실래요?) 🎫",
                    "조금만 더 투자하면 확 강해집니다. 17성의 세계로 오세요! 🌈",
                    "아직은 성장기! 무럭무럭 자라나는 새싹 용사님을 응원합니다. 🌱"
                ])
            };
        } else {
            newContent = {
                title: (
                    <span className="text-red-400 font-bold flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> 기초 강화가 필요합니다!
                    </span>
                ),
                sub: (
                    <p className="text-red-300">
                        평균 <span className="text-xl font-black">{avg}성</span> - 우선 12성까지 올려보세요!
                    </p>
                ),
                text: pick([
                    "12성까지는 파괴 확률이 없습니다. 가성비 좋은 12성부터 맞춰봅시다! 🔥",
                    "아직 별들의 힘이 부족합니다. 12성까지는 안전하니 부담 없이 강화해보세요! 🛡️",
                    "스타포스는 스펙업의 지름길! 우선 12성을 목표로 달려봅시다. 🏃‍♀️",
                    "스타포스 창을 열어보세요. 강화 버튼이 당신을 기다립니다. 🔘",
                    "10성에서 멈추면 섭섭해요. 12성까지는 금방입니다! 🚀",
                    "메소는 쓰라고 있는 것! 아끼다 똥... 아니, 스펙업 못 합니다! 💸",
                    "장비들이 울고 있어요. '주인님, 별 좀 달아주세요!' 😭",
                    "강화의 재미를 느껴보세요. 띵~ 띵~ 성공 소리가 듣기 좋습니다. 🔔"
                ])
            };
        }

        setContent(newContent);
    }, [avg, count22, count25Plus]);

    const typedText = useTypewriter(content?.text || "", 30);

    if (!content) return <div className="h-24 animate-pulse bg-slate-800/50 rounded-lg" />;

    return (
        <div className="text-center space-y-2">
            {content.title}
            {content.sub}
            <p className="text-slate-300 text-sm min-h-[3rem] flex items-start justify-center gap-0.5">
                <span dangerouslySetInnerHTML={{ __html: typedText }} />
                <span className="animate-pulse font-bold text-indigo-400">|</span>
            </p>
        </div>
    );
};

export default function TotalDiagnosisModal({ isOpen, onClose, data, userName, equipment }: TotalDiagnosisModalProps) {
    const [selectedSet, setSelectedSet] = useState<string | null>(null);
    const [showItems22, setShowItems22] = useState(false);
    const [showItems17, setShowItems17] = useState(false);

    // 뒤로가기 핸들링 및 스크롤 방지
    useEffect(() => {
        if (isOpen) {
            // 1. 모달이 열리면 히스토리 스택 추가
            window.history.pushState({ modal: 'total-diagnosis' }, '', window.location.href);

            // 2. 배경 스크롤 방지
            document.body.style.overflow = 'hidden';

            // 3. 뒤로가기(popstate) 이벤트 리스너
            const handlePopState = () => {
                // 뒤로가기가 눌리면 모달 닫기 (onClose 호출)
                onClose();
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                // 정리: 스크롤 복구 및 리스너 제거
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [isOpen, onClose]);

    // 닫기 버튼 핸들러: history.back()을 호출하여 popstate 이벤트를 발생시킴 -> onClose 실행됨
    const handleClose = () => {
        window.history.back();
    };

    if (!isOpen) return null;

    // Helper to render grade counts as Badges
    const renderGrades = (grades: Record<string, number>) => {
        const order = ['레전드리', '유니크', '에픽', '레어'];
        return (
            <div className="flex flex-wrap gap-1.5 mt-2">
                {order.map(g => {
                    if (!grades[g]) return null;
                    let bgClass = "bg-gray-500/20 text-gray-300 border-gray-500/30";
                    if (g === '레전드리') bgClass = "bg-green-500/20 text-green-400 border-green-500/30";
                    if (g === '유니크') bgClass = "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
                    if (g === '에픽') bgClass = "bg-purple-500/20 text-purple-400 border-purple-500/30";
                    if (g === '레어') bgClass = "bg-blue-500/20 text-blue-400 border-blue-500/30";

                    return (
                        <span key={g} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${bgClass} flex items-center gap-1`}>
                            {g} {grades[g]}
                        </span>
                    );
                })}
            </div>
        );
    };

    // Progress Bar Component
    const ProgressBar = ({ current, max, colorClass }: { current: number, max: number, colorClass: string }) => {
        const percent = Math.min(100, Math.max(0, (current / max) * 100));
        return (
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden mt-2 border border-white/5">
                <div
                    className={`h-full ${colorClass} transition-all duration-500 ease-out`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-indigo-500/10 relative flex flex-col custom-scrollbar">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900 sticky top-0 z-[60]">
                    <div className="flex items-center gap-4">
                        <div className="p-2 sm:p-3 bg-indigo-500/20 rounded-xl border border-indigo-500/30 shadow-inner">
                            <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                                종합 스펙 정밀 진단
                                <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-indigo-600 text-white rounded-full">BETA</span>
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                                <span className="text-indigo-300 font-bold">{userName}</span>님의 장비 세팅 분석 리포트
                            </p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors group">
                        <X className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950">

                    {/* 1. Starforce Section */}
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 relative group hover:border-yellow-500/30 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Star className="w-32 h-32 text-yellow-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-yellow-100">스타포스</h3>
                                <p className="text-xs text-slate-400">대상: 18부위 (무기+방어구+장신구+심장 - 특수반지 제외)</p>
                                <p className="text-[10px] text-slate-500 mt-0.5">* 이벤트 링은 스타포스 강화가 불가능합니다.</p>
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 relative ${showItems22 || showItems17 ? 'z-50' : 'z-10'}`}>
                            {/* Average Starforce */}
                            <div className="bg-slate-950/50 p-5 rounded-xl border border-yellow-500/20 flex flex-col justify-between">
                                <div>
                                    <div className="text-sm text-slate-400 mb-1">평균 스타포스</div>
                                    <div className="text-4xl font-black text-yellow-400 tracking-tight">{data.starforce.average}<span className="text-lg font-normal text-yellow-600 ml-1">성</span></div>
                                </div>
                                <div>
                                    <ProgressBar current={data.starforce.average} max={22} colorClass="bg-gradient-to-r from-yellow-600 to-yellow-400" />
                                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                                        <span>0</span>
                                        <span>22 MAX</span>
                                    </div>
                                </div>
                            </div>

                            {/* 22 Star Count */}
                            <div
                                className={`bg-slate-950/50 p-5 rounded-xl border border-green-500/20 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-900 transition-colors relative ${showItems22 ? 'z-50' : ''}`}
                                onClick={() => setShowItems22(!showItems22)}
                            >
                                <div className="text-sm text-slate-400 mb-2">22성 이상 아이템</div>
                                <div className="text-4xl font-black text-green-400">{data.starforce.count22}<span className="text-lg font-normal text-green-600 ml-1">개</span></div>
                                <div className="text-xs text-slate-500 mt-2">졸업급 장비 (클릭하여 확인)</div>

                                {showItems22 && data.starforce.items22 && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-slate-950 border border-green-500/30 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                                        <div className="bg-green-500/10 px-3 py-2 border-b border-green-500/20 flex justify-between items-center">
                                            <span className="text-xs font-bold text-green-300">목록 ({data.starforce.items22.length})</span>
                                            <button onClick={(e) => { e.stopPropagation(); setShowItems22(false); }} className="text-slate-400 hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <ul className="p-2 max-h-40 overflow-y-auto custom-scrollbar text-left">
                                            {data.starforce.items22.map((item, i) => (
                                                <li key={i} className="text-xs text-slate-300 py-1.5 px-2 hover:bg-white/5 rounded flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0"></span>
                                                    <span className="truncate">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* 17 Star Count */}
                            <div
                                className={`bg-slate-950/50 p-5 rounded-xl border border-blue-500/20 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-slate-900 transition-colors relative ${showItems17 ? 'z-50' : ''}`}
                                onClick={() => setShowItems17(!showItems17)}
                            >
                                <div className="text-sm text-slate-400 mb-2">17성 이상 아이템</div>
                                <div className="text-4xl font-black text-blue-400">{data.starforce.count17}<span className="text-lg font-normal text-blue-600 ml-1">개</span></div>
                                <div className="text-xs text-slate-500 mt-2">국민 세팅 기준 (클릭하여 확인)</div>

                                {showItems17 && data.starforce.items17 && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-slate-950 border border-blue-500/30 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                                        <div className="bg-blue-500/10 px-3 py-2 border-b border-blue-500/20 flex justify-between items-center">
                                            <span className="text-xs font-bold text-blue-300">목록 ({data.starforce.items17.length})</span>
                                            <button onClick={(e) => { e.stopPropagation(); setShowItems17(false); }} className="text-slate-400 hover:text-white">
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <ul className="p-2 max-h-40 overflow-y-auto custom-scrollbar text-left">
                                            {data.starforce.items17.map((item, i) => (
                                                <li key={i} className="text-xs text-slate-300 py-1.5 px-2 hover:bg-white/5 rounded flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                                    <span className="truncate">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 relative z-10 bg-slate-950/30 p-4 rounded-lg border border-white/5">
                            <StarforceCommentary
                                avg={data.starforce.average}
                                count22={data.starforce.count22 || 0}
                                count25Plus={equipment?.filter(item => {
                                    const sf = parseInt(item.starforce || "0");
                                    const slot = item.item_equipment_slot;
                                    const isExcluded = slot === '훈장' || slot === '뱃지' || slot === '포켓 아이템';
                                    return sf >= 25 && !isExcluded;
                                }).length || 0}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* 2. WSE Potential Section */}
                        <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col hover:border-red-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Sword className="w-24 h-24 text-red-500" />
                            </div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2 bg-red-500/20 rounded-lg">
                                    <Sword className="w-6 h-6 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-red-100">무보엠 잠재능력 (WSE)</h3>
                            </div>

                            <div className="space-y-4 flex-1 relative z-10">
                                {/* Potential */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-red-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">윗잠재 (Potential)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.wse.potential.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 9줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.wse.potential.validLines} max={9} colorClass="bg-gradient-to-r from-red-600 to-red-400" />
                                    {renderGrades(data.wse.potential.gradeCount)}

                                    {/* IED Warning */}
                                    {data.wse.iedLines >= 2 && (
                                        <div className="mt-3 pt-2 border-t border-white/5 text-xs text-orange-400 font-bold flex items-start gap-1 animate-pulse">
                                            <AlertTriangle className="w-3 h-3 mt-0.5" />
                                            <span>방무가 {data.wse.iedLines}줄입니다. (권장: 0~1줄)</span>
                                        </div>
                                    )}
                                </div>

                                {/* Additional */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-red-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">에디셔널 (Additional)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.wse.additional.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 9줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.wse.additional.validLines} max={9} colorClass="bg-gradient-to-r from-red-900 to-red-700" />
                                    {renderGrades(data.wse.additional.gradeCount)}
                                </div>

                                <div className="text-[11px] text-slate-500 bg-slate-950/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-slate-600" />
                                    <div>
                                        <span className="font-bold text-slate-400">유효 옵션 기준:</span> 보공, 공/마% (방무는 별도 체크)
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Armor/Acc Potential Section */}
                        <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 flex flex-col hover:border-cyan-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Zap className="w-24 h-24 text-cyan-500" />
                            </div>

                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="p-2 bg-cyan-500/20 rounded-lg">
                                    <Zap className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-cyan-100">방어구/장신구 잠재능력</h3>
                            </div>

                            <div className="space-y-4 flex-1 relative z-10">
                                {/* Potential */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-cyan-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">윗잠재 (Potential)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.armorAcc.potential.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 51줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.armorAcc.potential.validLines} max={51} colorClass="bg-gradient-to-r from-cyan-600 to-cyan-400" />
                                    {renderGrades(data.armorAcc.potential.gradeCount)}

                                    {/* Highlights */}
                                    <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-2 gap-3">
                                        <div className="bg-slate-900 p-2 rounded border border-white/5 text-center">
                                            <div className="text-[10px] text-slate-500 mb-1">모자 쿨감</div>
                                            <div className="text-white font-bold text-sm">{data.armorAcc.potential.hatCooltime > 0 ? `-${data.armorAcc.potential.hatCooltime}초` : '-'}</div>
                                        </div>
                                        <div className="bg-slate-900 p-2 rounded border border-white/5 text-center">
                                            <div className="text-[10px] text-slate-500 mb-1">장갑 크뎀</div>
                                            <div className="text-white font-bold text-sm">{data.armorAcc.potential.gloveCritDmg > 0 ? `${data.armorAcc.potential.gloveCritDmg}줄` : '-'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional */}
                                <div className="bg-slate-950/50 p-4 rounded-xl border border-cyan-500/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-sm font-bold text-slate-300">에디셔널 (Additional)</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-white">{data.armorAcc.additional.validLines}</span>
                                            <span className="text-sm text-slate-500"> / 51줄</span>
                                        </div>
                                    </div>
                                    <ProgressBar current={data.armorAcc.additional.validLines} max={51} colorClass="bg-gradient-to-r from-cyan-900 to-cyan-700" />
                                    {renderGrades(data.armorAcc.additional.gradeCount)}
                                </div>

                                <div className="text-[11px] text-slate-500 bg-slate-950/30 p-2.5 rounded-lg border border-white/5 flex items-start gap-2">
                                    <CheckCircle2 className="w-3 h-3 mt-0.5 text-slate-600" />
                                    <div>
                                        <span className="font-bold text-slate-400">유효 옵션 기준:</span> 주스탯%, 올스탯%, 크뎀(장갑), 쿨감(모자), 렙당스탯
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Set Effect Section */}
                    <div className="bg-slate-800/40 rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Layers className="w-24 h-24 text-purple-500" />
                        </div>

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Layers className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-purple-100">세트 효과 분석</h3>
                        </div>

                        <div className="bg-slate-950/50 p-5 rounded-xl border border-purple-500/20 relative z-10">
                            <div className="flex flex-wrap gap-2">
                                {data.setEffect.activeSets.length > 0 ? (
                                    data.setEffect.activeSets.map((setStr, idx) => {
                                        const parts = setStr.split(' ');
                                        const setName = parts.slice(0, parts.length - 1).join(' '); // "광휘의 보스 3셋" -> "광휘의 보스"
                                        const items = data.setEffect.setDetails?.[setName] || [];
                                        const isSelected = selectedSet === setName;

                                        return (
                                            <div key={idx} className="relative">
                                                <button
                                                    onClick={() => setSelectedSet(isSelected ? null : setName)}
                                                    className={`px-4 py-1.5 rounded-lg text-sm font-bold border shadow-sm transition-all flex items-center gap-2
                                                        ${isSelected
                                                            ? 'bg-purple-500 text-white border-purple-400 shadow-purple-500/20'
                                                            : 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:bg-purple-500/20'
                                                        }`}
                                                >
                                                    {setStr}
                                                    {items.length > 0 && (
                                                        <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full">
                                                            ℹ️
                                                        </span>
                                                    )}
                                                </button>

                                                {/* Item List Popover */}
                                                {isSelected && items.length > 0 && (
                                                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-slate-900 border border-purple-500/30 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                        <div className="bg-purple-500/10 px-3 py-2 border-b border-purple-500/20 flex justify-between items-center">
                                                            <span className="text-xs font-bold text-purple-300">{setName} 구성 아이템</span>
                                                            <button onClick={(e) => { e.stopPropagation(); setSelectedSet(null); }} className="text-slate-400 hover:text-white">
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                        <ul className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
                                                            {items.map((item, i) => (
                                                                <li key={i} className="text-xs text-slate-300 py-1.5 px-2 hover:bg-white/5 rounded flex items-center gap-2">
                                                                    <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <span className="text-slate-500 text-sm">적용 중인 주요 세트 효과가 없습니다.</span>
                                )}
                            </div>
                            {data.setEffect.luckyItemApplied && (
                                <div className="mt-4 text-sm text-yellow-400 flex items-center gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                    <Star className="w-4 h-4 fill-yellow-400" />
                                    <span>럭키 아이템(제네시스/데스티니) 효과가 적용 중입니다!</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Ad Section - Above Footer */}
                <div className="px-6 pb-4">
                    <div className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 flex items-center justify-center min-h-[100px]">
                        {/* Google AdSense Ad - Insert ad code here */}
                        <ins className="adsbygoogle"
                            style={{ display: 'block' }}
                            data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                            data-ad-slot="YOUR_AD_SLOT_ID"
                            data-ad-format="horizontal"
                            data-full-width-responsive="true"></ins>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-slate-900 sticky bottom-0 z-[60] flex justify-end rounded-b-2xl">
                    <button
                        onClick={handleClose}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
}
