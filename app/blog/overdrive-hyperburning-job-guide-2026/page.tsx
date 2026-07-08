'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Youtube, Trophy, ThumbsUp, ThumbsDown, Users, Flame, Crown, Shield, Zap, Target } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// 유튜버 데이터
const youtubers = [
    {
        name: '혜유안',
        videoId: '27rT0CXS4Wo',
        link: 'https://youtu.be/27rT0CXS4Wo?si=7-xbhm4r5CHmNgUX',
        theme: 'from-red-900/40 to-orange-900/40 border-red-500/40',
        badge: 'bg-red-500/20 text-red-300',
        dot: 'bg-red-400',
        jobs: [
            { name: '와일드헌터', image: '/images/jobs/와일드헌터.png', score: '⭐⭐⭐⭐⭐', tag: '뉴비 강력 추천', reason: '10초 무적으로 보스 패턴 날먹, 사기급 유틸리티 완비, 사냥 피로도 낮음', con: '이동속도가 너무 빠름, 재규어 탑승 피격판정 헷갈림' },
            { name: '렌', image: '/images/jobs/렌.png', score: '⭐⭐⭐⭐⭐', tag: '뉴비 강력 추천', reason: '전사인데 속사기 보유, 딜사이클 직관적·극단순, 무적기·체공기·전후방 이동기 완비', con: '플레이가 단순해 취향에 따라 지루함' },
            { name: '플레임위자드', image: '/images/jobs/플레임위자드.png', score: '⭐⭐⭐⭐', tag: '추천', reason: '더블 점프 + 속사기, 무적기 2개·상태이상 면역, 사냥 매우 쾌적', con: '키다운 극딜기라 삑사리 시 극딜 통째로 날아감' },
            { name: '윈드브레이커', image: '/images/jobs/윈드브레이커.png', score: '⭐⭐⭐⭐', tag: '추천', reason: '윈드 월(최강 생존기)·윈드 워크·에메랄드 플라워, 속사기 사냥 매우 편함', con: '손이 꽤 바빠 호불호' },
            { name: '레테', image: '/images/jobs/레테.png', score: '⭐⭐⭐⭐', tag: '뉴비 추천', reason: '신규 직업, 대각선 텔레포트·체공·1분 쿨 무적기, 조작 난이도 낮음', con: '소환수 100% 의존, 타격감 부족, 딜로스 발생 가능' },
            { name: '카인', image: '/images/jobs/카인.png', score: '⭐⭐⭐', tag: '컨트롤 고수 전용', reason: '다크 사이트(낙하물 무시)·이동형 무적기, 딜 성능 매우 훌륭', con: '쿨타임 상시 확인 필요, 경직 타이밍에 비명횡사 위험' },
            { name: '섀도어', image: '/images/jobs/섀도어.png', score: '⭐', tag: '뉴비 절대 비추천', reason: '메소 획득 20% 증가, 광부 끝판왕', con: '상시 무적기 없음, 컨트롤에 따라 딜량 극과 극' },
        ],
        disrecommend: ['섀도어'],
    },
    {
        name: '진격캐넌',
        videoId: '7EiXMZXUCNM',
        link: 'https://youtu.be/7EiXMZXUCNM?si=1UPdzoYiQaoUDtC_',
        theme: 'from-blue-900/40 to-cyan-900/40 border-blue-500/40',
        badge: 'bg-blue-500/20 text-blue-300',
        dot: 'bg-blue-400',
        jobs: [
            { name: '아란', image: '/images/jobs/아란.png', score: '⭐⭐⭐⭐⭐', tag: '뉴비 강력 추천', reason: '극딜 강력 + 스킬 구조 초간단, 긴/짧은 무적 + 극딜 흡혈, 고점 성능 훌륭', con: '' },
            { name: '보우마스터', image: '/images/jobs/보우마스터.png', score: '👑 1티어', tag: '뉴비 추천 1티어', reason: '조작 난이도 메이플 최하 수준, 난이도 대비 딜 매우 잘 나옴, 고점도 준수', con: '플레이가 심심할 수 있음' },
            { name: '소울마스터', image: '/images/jobs/소울마스터.png', score: '추천', tag: '가볍게 하기 좋음', reason: '시너지 직업으로 난이도 매우 낮음, 캔슬 돌진 장점', con: '고점 시 시너지 효율 아쉬움' },
            { name: '아델', image: '/images/jobs/아델.png', score: '추천', tag: '약간의 이해도 필요', reason: '유틸 골고루 쓸만하게 분포, 난이도 많이 내려옴, 본캐 체급 괜찮음', con: '딜 편차 있어 직업 이해도 필요' },
            { name: '윈드브레이커', image: '/images/jobs/윈드브레이커.png', score: '추천', tag: '뉴비 추천', reason: '윈드월 생존기 존재감 크고 무빙 좋음', con: '' },
            { name: '와일드헌터', image: '/images/jobs/와일드헌터.png', score: '추천', tag: '추천', reason: '난이도 완화, 긴 무적기 고평가, 고점 클리어 타임 우수', con: '' },
            { name: '아크', image: '/images/jobs/아크.png', score: '강력 추천', tag: '2회차 유저 깡패', reason: '시너지 + 딜 둘 다 좋음, 고점에서 대접받는 고밸류 직업', con: '난이도 약간 있음' },
            { name: '제논', image: '/images/jobs/제논.png', score: '고점 GOAT', tag: '본캐 강력 추천', reason: '올라갈수록 기하급수적으로 강해짐, 너프 위험 낮음', con: '템 세팅 헬, 라이트 유저 비추천' },
        ],
        disrecommend: ['블래스터', '카이저', '제로', '불독', '에반', '카데나', '메카닉', '팔라딘', '다크나이트', '데몬어벤져', '신궁', '패스파인더', '캡틴', '캐논슈터'],
    },
    {
        name: '도루',
        videoId: 'qzvBX5LZAE8',
        link: 'https://youtu.be/qzvBX5LZAE8?si=IIAICxmFwK0lFjPz',
        theme: 'from-green-900/40 to-emerald-900/40 border-green-500/40',
        badge: 'bg-green-500/20 text-green-300',
        dot: 'bg-green-400',
        jobs: [
            { name: '보우마스터', image: '/images/jobs/보우마스터.png', score: '✅ 메인 추천', tag: '뉴비 국밥픽', reason: '난이도 메이플 최하 수준, 무빙 속사기 딜 누수 없음, 장인·초보 딜 차이 가장 적음', con: '극딜 시간 너무 길어 최상위권 보스에서 한계, 보조무기 가격 비쌈' },
            { name: '썬콜', image: '/images/jobs/아크메이지(썬,콜).png', score: '✅ 메인 추천', tag: '마법사 국밥', reason: '허수아비 딜 중상위권, 체인 라이트닝 하나로 조작 끝, 텔레포트로 보스 패턴 캔슬 가능', con: '40초 쿨타임 스킬이 딜 사이클과 따로 놀아 거슬림, 보조무기 가격 높음' },
            { name: '윈드브레이커', image: '/images/jobs/윈드브레이커.png', score: '✅ 메인 추천', tag: '장기 투자 최고', reason: '보마처럼 쉬운 조작 + 극딜 압축 뛰어나 고점에서 보마보다 훨씬 유리, 보조무기 저렴', con: '쿨감모자 의존도 매우 높음(3~5초 필수), 자본 투입 필요' },
            { name: '아델', image: '/images/jobs/아델.png', score: '✅ 메인 추천', tag: '전사 1위', reason: '패치로 딜 구조 개선, 순수 체급 상위권, 짧은 쿨 무적기·체공 유틸 빼어남, 보조무기 저렴', con: '쿨감모자 의존도 높음, 조작 약간 뻑뻑함' },
            { name: '렌', image: '/images/jobs/렌.png', score: '서브 언급', tag: '뉴비 좋으나 저딜', reason: '조작 쉽고 뉴비에게 좋음', con: '순수 체급 확고한 하위권 → 고스펙 관점에서 메인 제외' },
            { name: '아크', image: '/images/jobs/아크.png', score: '서브 언급', tag: '연계 자신 있으면', reason: '순수 체급 최상위권 고점 깡패', con: '연계 구조라 초보 평균 감안 메인 제외' },
            { name: '제논', image: '/images/jobs/제논.png', score: '서브 언급', tag: '고스펙 GOAT', reason: '환산 9만 이상 체급 GOAT급 최상위권', con: '조작 뻑뻑 + 아이템 매물 적어 중/저스펙 비효율' },
        ],
        disrecommend: [],
    },
    {
        name: '잼이',
        videoId: 'xZKpu0_wY5k',
        link: 'https://youtu.be/xZKpu0_wY5k?si=WGegWvZFUYEaE1Hc',
        theme: 'from-purple-900/40 to-violet-900/40 border-purple-500/40',
        badge: 'bg-purple-500/20 text-purple-300',
        dot: 'bg-purple-400',
        jobs: [
            { name: '렌', image: '/images/jobs/렌.png', score: '🥇 1위', tag: '메타 기준점', reason: '"모든 캐릭터는 렌 전후로 나뉜다" — 극딜 압축 최고, 조작 쉬움, 무적·피흡·텔포 이동기 완벽 (신캐 레테 대비 높은 안정성)', con: '플레이가 너무 단순하여 다소 지루할 수 있음' },
            { name: '보우마스터', image: '/images/jobs/보우마스터.png', score: '🥈 2위', tag: '뇌비우기 국밥', reason: '폭풍의 시 하나만 눌러도 딜 완성, 보스 패턴 피하기에만 집중 가능, 평준화 패치로 유틸 강화', con: '지루함, 극딜 압축 약간 부족' },
            { name: '썬콜', image: '/images/jobs/아크메이지(썬,콜).png', score: '🥉 3위', tag: '쌀먹 픽', reason: '6차 강화 적게 해도 효율 좋은 쌀먹 픽, 노쿨 텔레포트·바인드 무적·프리징 브레스로 보스 생존 최상', con: '' },
            { name: '아란', image: '/images/jobs/아란.png', score: '4위', tag: '보스 미션 특화', reason: '극딜 압축으로 타이밍에 와다닥 딜 넣고 빠지기 좋음, 체력 회복+무적으로 생존·딜 두 마리 토끼', con: '' },
            { name: '와일드헌터', image: '/images/jobs/와일드헌터.png', score: '5위', tag: '챌린저스 특화', reason: '챌섭 혜택으로 쿨감모자 쉽게 맞춤 → 단점 해소, 커맨드 스킬로 보마만큼 쉬워짐, 10초 무적 유틸', con: '재규어 강제 탑승 외형 호불호' },
        ],
        disrecommend: [],
    },
    {
        name: '메이플 대장메린이',
        videoId: 'BRoQ79OXYEY',
        link: 'https://youtu.be/BRoQ79OXYEY?si=O08SYilcpFSRP0Zg',
        theme: 'from-yellow-900/40 to-amber-900/40 border-yellow-500/40',
        badge: 'bg-yellow-500/20 text-yellow-300',
        dot: 'bg-yellow-400',
        jobs: [
            { name: '렌', image: '/images/jobs/렌.png', score: '🥇 1위', tag: '국밥 1순위', reason: '속사기 + 이동 + 더블 점프 동시 가능, 육각형 밸런스 최고, 절대 후회 없는 국밥픽', con: '체급 살짝 떨어지지만 유틸로 상쇄' },
            { name: '보우마스터', image: '/images/jobs/보우마스터.png', score: '🥈 2위', tag: '최소 스킬 최고 딜', reason: '전 직업 중 누를 스킬 가장 적음, 그런데도 딜량 매우 셈, 주력기 쓰며 이동 가능', con: '조작 너무 단순해 심심함' },
            { name: '일리움', image: '/images/jobs/일리움.png', score: '3위', tag: '성능 결점 없음', reason: '순수 성능·체급 매우 좋음, 비행 유틸로 보스전 딜 편함, 이벤트 효과로 사냥 단점 해소', con: '레테로 인한 인트 템값 상승, 외형 호불호' },
            { name: '아란', image: '/images/jobs/아란.png', score: '4위', tag: '극딜 몰빵', reason: '극딜 몰빵형으로 구조·난이도 쉬움, 체급 좋아 고점 뽑기 수월, 폴암 전사 컨셉 매력', con: '' },
            { name: '썬콜', image: '/images/jobs/아크메이지(썬,콜).png', score: '5위', tag: '쉽고 예쁜 마법사', reason: '쉽고 예쁜 마법사 1위, 오리진 스킬 연출 화려', con: '초중반(4만 이하) 체급 살짝 약함' },
            { name: '아크', image: '/images/jobs/아크.png', score: '6위', tag: '고딜 연계', reason: '연계 직업 중 가장 쉬운 편, 체급 매우 셈, 이벤트로 사냥 피로도 해결', con: '' },
            { name: '레테', image: '/images/jobs/레테.png', score: '7위', tag: '테섭 필수 체험', reason: '스킬 이펙트 예쁨, 성장 보상 이벤트 빵빵, 5초·30초 한 번씩만 눌러도 평딜 완성', con: '조작감 호불호 극심 → 테섭 필수 체험' },
            { name: '아델', image: '/images/jobs/아델.png', score: '8위', tag: '육각형 직업', reason: '편의성 패치로 난이도 내려옴, 스킬 멋있고 체급 좋음, 보조무기 저렴', con: '' },
            { name: '와일드헌터', image: '/images/jobs/와일드헌터.png', score: '9위', tag: '보마 대안 궁수', reason: '보마 지루한 유저를 위한 궁수 대안, 속사기 + 이동/점프 가능, 유틸 매우 좋음', con: '' },
            { name: '호영', image: '/images/jobs/호영.png', score: '10위', tag: '가성비 세팅', reason: 'LUK 템값 압도적 저렴, 스킬·컨셉 확고', con: '게이지·연계·강제 체공 조작 불편 → 럭 직업 꼭 하고 싶은 사람에게만' },
        ],
        disrecommend: [],
    },
    {
        name: '나로후닝',
        videoId: 'HVSa7aqX5Tk',
        link: 'https://youtu.be/HVSa7aqX5Tk',
        theme: 'from-pink-900/40 to-rose-900/40 border-pink-500/40',
        badge: 'bg-pink-500/20 text-pink-300',
        dot: 'bg-pink-400',
        jobs: [
            { name: '제논', image: '/images/jobs/제논.png', score: '🏆 핵심 추천', tag: '재미·체급 1티어', reason: '체급 압도적, 완벽한 컨트롤 없어도 강력, 몬파 등 다양한 콘텐츠 활약', con: '올스탯 세팅 비용 매우 비쌈, 조작감 뻑뻑, 너프 위험' },
            { name: '캡틴', image: '/images/jobs/캡틴.png', score: '🏆 핵심 추천', tag: '재미 1티어', reason: '과거 불편함 대폭 개선, 윙즈 등 유틸 뛰어남, 일러스트·사운드 장점', con: '체급(딜)이 약함' },
            { name: '데몬슬레이어', image: '/images/jobs/데몬슬레이어.png', score: '🏆 핵심 추천', tag: '뽕맛 1티어', reason: '체급 상당히 좋아짐, 6차 오리진 스킬 타격감·뽕맛 최상', con: '' },
            { name: '아란', image: '/images/jobs/아란.png', score: '👍 추천', tag: '추천', reason: '극딜 압축, 프리드 완화 덕분에 3초 뽕맛', con: '' },
            { name: '아델', image: '/images/jobs/아델.png', score: '👍 추천', tag: '추천', reason: '저스펙 구간 체급 좋고 무난한 픽', con: '' },
            { name: '보우마스터', image: '/images/jobs/보우마스터.png', score: '👍 추천', tag: '저스펙 구간 최강', reason: '저스펙 구간(유니온/챔피언 라인) 체급 최강, 보스 클리어 타임 획기적 단축', con: '' },
            { name: '아크', image: '/images/jobs/아크.png', score: '👍 추천', tag: '추천', reason: '연계 어렵지 않음, 극딜·유틸 좋음, 게이지 관리 자유로움', con: '' },
            { name: '윈드브레이커', image: '/images/jobs/윈드브레이커.png', score: '👍 추천', tag: '추천', reason: '유틸·이동성 좋음', con: '' },
            { name: '와일드헌터', image: '/images/jobs/와일드헌터.png', score: '👍 추천', tag: '추천', reason: '추천 목록에 포함', con: '' },
            { name: '일리움', image: '/images/jobs/일리움.png', score: '👍 추천', tag: '추천', reason: '추천 목록에 포함', con: '' },
        ],
        disrecommend: ['다크나이트', '호영', '바이퍼', '에반', '캐논슈터', '메카닉', '엔젤릭버스터', '팔라딘'],
    },
];

// TOP 10 데이터
const top10 = [
    {
        rank: 1,
        name: '렌',
        image: '/images/jobs/렌.png',
        class: '전사',
        emoji: '⚔️',
        score: 97,
        badge: '전체 1위 · 뉴비 국밥픽',
        badgeColor: 'bg-yellow-500 text-black',
        color: 'from-yellow-900/50 to-amber-900/50 border-yellow-500/60',
        glow: 'shadow-yellow-900/30',
        mentionCount: 5,
        mentioners: ['혜유안 (⭐⭐⭐⭐⭐)', '잼이 (🥇1위)', '메이플 대장메린이 (🥇1위)', '진격캐넌 (추천)', '도루 (서브 언급)'],
        pros: ['딜 사이클 초단순·직관적', '속사기 + 이동 + 더블 점프 동시 가능', '무적기·체공기·전후방 이동기 유틸 완벽', '피흡·텔레포트 판정 이동기 보유', '"메타의 기준점" — 모든 직업은 렌 전후로 평가됨'],
        cons: ['체급(딜)이 상위권보다 살짝 낮음', '플레이가 단순해 고인물은 지루함'],
        recommend: '뉴비·복귀자 무조건 추천',
    },
    {
        rank: 2,
        name: '보우마스터',
        image: '/images/jobs/보우마스터.png',
        class: '궁수',
        emoji: '🏹',
        score: 95,
        badge: '뉴비 딜 국밥 · 조작 최하 수준',
        badgeColor: 'bg-orange-500 text-white',
        color: 'from-orange-900/50 to-red-900/50 border-orange-500/60',
        glow: 'shadow-orange-900/30',
        mentionCount: 5,
        mentioners: ['진격캐넌 (👑뉴비 1티어)', '도루 (✅메인 추천 1번)', '잼이 (🥈2위)', '메이플 대장메린이 (🥈2위)', '나로후닝 (👍저스펙 최강)'],
        pros: ['전 직업 중 누를 스킬 가장 적음', '무빙 속사기 기반 딜 누수 없음', '장인·초보 딜 차이 가장 적음 (흡혈 유틸)', '보스 패턴 피하기에만 집중 가능', '평준화 패치로 유틸도 강화됨'],
        cons: ['극딜 시간 너무 길어 최상위권 보스에서 한계', '보조무기 가격 비쌈'],
        recommend: '컨트롤 자신 없는 뉴비 최강 픽',
    },
    {
        rank: 3,
        name: '와일드헌터',
        image: '/images/jobs/와일드헌터.png',
        class: '궁수',
        emoji: '🐆',
        score: 88,
        badge: '유틸 끝판왕 · 무적 사기',
        badgeColor: 'bg-green-600 text-white',
        color: 'from-green-900/50 to-teal-900/50 border-green-500/60',
        glow: 'shadow-green-900/30',
        mentionCount: 5,
        mentioners: ['혜유안 (⭐⭐⭐⭐⭐ 뉴비 강추)', '진격캐넌 (추천)', '잼이 (5위)', '메이플 대장메린이 (9위)', '나로후닝 (👍추천)'],
        pros: ['극딜기 사용 시 10초 무적 — 보스 패턴 날먹', '1.9초 짧은 무적기 별도 보유', '어그로 더미(몸박 무시)·순간이동 등 유틸 사기급', '챌린저스 서버에서 쿨감모자 쉽게 맞춤 → 단점 해소', '속사기 기반 딜사이클 단순'],
        cons: ['이동 속도가 너무 빠름', '재규어 강제 탑승 외형 호불호'],
        recommend: '생존 걱정 없이 편하게 키우고 싶은 유저',
    },
    {
        rank: 4,
        name: '아란',
        image: '/images/jobs/아란.png',
        class: '전사',
        emoji: '🌨️',
        score: 85,
        badge: '극딜 압축 최강 · 보스 미션 특화',
        badgeColor: 'bg-blue-600 text-white',
        color: 'from-blue-900/50 to-indigo-900/50 border-blue-500/60',
        glow: 'shadow-blue-900/30',
        mentionCount: 4,
        mentioners: ['진격캐넌 (⭐⭐⭐⭐⭐ 뉴비 강추)', '잼이 (4위)', '메이플 대장메린이 (4위)', '나로후닝 (👍추천)'],
        pros: ['극딜 압축 매우 잘 되어 있음', '긴 무적 + 짧은 무적 + 극딜 흡혈 유틸 완비', '타이밍에 와다닥 딜 넣고 빠지기 최적화', '체급·고점 성능 훌륭 (하드 세렌 클리어 타임 우수)', '폴암 전사 컨셉 매력적'],
        cons: ['딜 구조 이해가 필요한 편'],
        recommend: '보스 미션 중심 챌린저스 시즌4에 최적',
    },
    {
        rank: 5,
        name: '윈드브레이커',
        image: '/images/jobs/윈드브레이커.png',
        class: '궁수',
        emoji: '🌪️',
        score: 83,
        badge: '생존 최강 · 장기 투자 우수',
        badgeColor: 'bg-cyan-600 text-white',
        color: 'from-cyan-900/50 to-sky-900/50 border-cyan-500/60',
        glow: 'shadow-cyan-900/30',
        mentionCount: 4,
        mentioners: ['혜유안 (⭐⭐⭐⭐)', '진격캐넌 (추천)', '도루 (✅메인 추천)', '나로후닝 (👍추천)'],
        pros: ['윈드 월 — 메이플 최고의 생존기', '윈드 워크 — 사기급 이동기', '보마처럼 쉬운 조작(무빙 속사) + 극딜 압축까지 겸비', '고점에서 보우마스터보다 훨씬 유리', '보조무기 가격 착함'],
        cons: ['쿨타임 감소 모자 의존도 매우 높음 (3~5초 필수)', '쿨감뚝에 자본 많이 필요'],
        recommend: '장기적으로 성장할 본캐를 찾는 유저',
    },
    {
        rank: 6,
        name: '아델',
        image: '/images/jobs/아델.png',
        class: '전사',
        emoji: '🗡️',
        score: 80,
        badge: '전사 추천 1위 · 제2의 전성기',
        badgeColor: 'bg-violet-600 text-white',
        color: 'from-violet-900/50 to-purple-900/50 border-violet-500/60',
        glow: 'shadow-violet-900/30',
        mentionCount: 4,
        mentioners: ['진격캐넌 (추천)', '도루 (✅메인 추천)', '메이플 대장메린이 (8위)', '나로후닝 (👍추천)'],
        pros: ['연속 패치로 딜 구조 대폭 개선됨', '순수 체급(딜) 상위권', '짧은 쿨타임 무적기 특급 성능', '공중 체공 유틸 보유', '보조무기 매물 많고 저렴'],
        cons: ['쿨타임 감소 모자 의존도 높음', '타 직업 대비 조작 살짝 뻑뻑함'],
        recommend: '전사 하고 싶다면 지금 당장 아델',
    },
    {
        rank: 7,
        name: '아크',
        image: '/images/jobs/아크.png',
        class: '해적',
        emoji: '💥',
        score: 75,
        badge: '고점 깡패 · 딜 최상위권',
        badgeColor: 'bg-rose-600 text-white',
        color: 'from-rose-900/50 to-pink-900/50 border-rose-500/60',
        glow: 'shadow-rose-900/30',
        mentionCount: 4,
        mentioners: ['진격캐넌 (강력 추천)', '도루 (서브/연계 자신 있으면 강력 추천)', '메이플 대장메린이 (6위)', '나로후닝 (👍추천)'],
        pros: ['딜(체급) 최상위권 수준', '시너지 보유 + 딜 둘 다 좋음', '연계 직업 중에서는 쉬운 편', '이벤트 효과로 사냥 피로도 단점 해소', '게이지 관리를 원할 때 자유롭게 가능'],
        cons: ['연계/게이지/변신 3단 콤보라 초보자 진입 장벽', '위로 올라갈수록 진가 발휘 — 2회차 유저에게 최적'],
        recommend: '연계 조작에 자신 있는 유저 강력 추천',
    },
    {
        rank: 8,
        name: '썬콜',
        image: '/images/jobs/아크메이지(썬,콜).png',
        class: '마법사',
        emoji: '⚡',
        score: 68,
        badge: '마법사 국밥 · 쌀먹 픽',
        badgeColor: 'bg-yellow-700 text-white',
        color: 'from-yellow-900/40 to-lime-900/40 border-yellow-600/40',
        glow: 'shadow-yellow-900/20',
        mentionCount: 3,
        mentioners: ['도루 (✅메인 추천)', '잼이 (🥉3위)', '메이플 대장메린이 (5위)'],
        note: '⚠️ 나로후닝 조건부 비추천 (쿨감모자 과의존)',
        pros: ['허수아비 딜 기준 중상위권', '체인 라이트닝 하나만 누르면 끝 — 조작 최하 수준', '노쿨 텔레포트로 보스 패턴 캔슬 자유자재', '6차 강화 적게 해도 효율 좋음 (쌀먹 픽)', '바인드 무적·프리징 브레스 유틸'],
        cons: ['40초 쿨타임 스킬이 딜 사이클과 따로 놀아 거슬림', '보조무기 가격 상승', '나로후닝: 쿨감모자 과의존 구조 비판'],
        recommend: '마법사를 쉽고 가볍게 즐기고 싶은 유저',
    },
    {
        rank: 9,
        name: '제논',
        image: '/images/jobs/제논.png',
        class: '도적/해적',
        emoji: '🤖',
        score: 62,
        badge: '고점 GOAT · 고스펙 전용',
        badgeColor: 'bg-slate-600 text-white',
        color: 'from-slate-800/60 to-zinc-900/60 border-slate-500/50',
        glow: 'shadow-slate-900/20',
        mentionCount: 3,
        mentioners: ['진격캐넌 (고점 GOAT, 라이트 유저 비추천)', '도루 (서브, 고스펙 한정)', '나로후닝 (🏆핵심 추천)'],
        pros: ['올라갈수록 기하급수적으로 강해지는 후반 GOAT 직업', '올스탯 구조상 너프 위험 낮음', '다양한 콘텐츠에서 활약 가능', '컨트롤 완벽하지 않아도 강력'],
        cons: ['올스탯 아이템 세팅 비용 매우 비쌈', '아이템 매물 적어 세팅이 헬', '조작감 뻑뻑함', '중·저스펙 유저에겐 비효율'],
        recommend: '고스펙 본캐를 목표로 하는 유저 한정',
    },
    {
        rank: 10,
        name: '일리움',
        image: '/images/jobs/일리움.png',
        class: '마법사',
        emoji: '✨',
        score: 55,
        badge: '성능 결점 없음 · 비행 유틸',
        badgeColor: 'bg-indigo-600 text-white',
        color: 'from-indigo-900/40 to-blue-900/40 border-indigo-500/40',
        glow: 'shadow-indigo-900/20',
        mentionCount: 2,
        mentioners: ['메이플 대장메린이 (3위)', '나로후닝 (👍추천)'],
        pros: ['순수 성능·체급 매우 좋음', '비행 유틸로 보스전 딜 편함', '이번 시즌 이벤트로 사냥 단점 해소 → 성능 면 결점 없음'],
        cons: ['레테 등장으로 인트 템값 상승 우려', '캐릭터 외형 호불호'],
        recommend: '성능 중심 마법사를 원하는 유저',
    },
];

// 비추천 직업 종합
const disrecommendJobs = [
    { name: '섀도어', reason: '상시 무적기 없음, 컨트롤에 따라 딜량 극과 극 → 뉴비 절대 비추', mentioner: '혜유안' },
    { name: '다크나이트', reason: '오리진 스킬 성능 전 직업 최하위, 체급도 예전 같지 않아 메리트 없음', mentioner: '나로후닝, 진격캐넌' },
    { name: '바이퍼', reason: '딜이 약하고 뚜렷한 장점 없음', mentioner: '나로후닝' },
    { name: '에반', reason: '체급 낮고 불독/비숍 대비 플레이 메리트 부족', mentioner: '나로후닝, 진격캐넌' },
    { name: '팔라딘', reason: '구조적 한계, 낮은 체급', mentioner: '진격캐넌, 나로후닝' },
    { name: '메카닉', reason: '조작이 어려워 뉴비 비추, 성능 대비 조작 비용 높음', mentioner: '진격캐넌, 나로후닝' },
    { name: '캐논슈터', reason: '시너지 외 메리트 부족, 딜 구조 한계', mentioner: '진격캐넌, 나로후닝' },
    { name: '블래스터', reason: '조작이 어려워 뉴비 비추천', mentioner: '진격캐넌' },
    { name: '호영', reason: '강제 체공 불쾌함, 선단·기력 관리 구조적 답답함', mentioner: '나로후닝, 메이플 대장메린이 (조건부)' },
    { name: '엔젤릭버스터', reason: '나로후닝 비추천 목록에 포함', mentioner: '나로후닝' },
];

export default function OverdriveHyperburningJobGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* 헤더 */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

                {/* 타이틀 섹션 */}
                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-bold rounded-full border border-orange-500/30">
                            🔥 육성 가이드
                        </span>
                        <span className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-full border border-red-500/30 animate-pulse">
                            🆕 오버드라이브 업데이트
                        </span>
                        <span className="text-slate-500 text-sm">2026년 6월 17일</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-5 leading-tight">
                        🔥 2026년 여름 오버드라이브<br />
                        <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                            하이퍼버닝 직업 추천 종합 정리
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-6">
                        유명 메이플 유튜버 <strong className="text-white">6명</strong>의 영상을 모두 분석해 직접 비교했습니다.
                        각 유튜버가 <strong className="text-orange-400">왜 이 직업을 추천했는지</strong>,
                        어떤 직업이 가장 많이 언급됐는지 점수화해 <strong className="text-yellow-400">TOP 10</strong>으로 정리합니다.
                    </p>

                    {/* 분석 유튜버 배지 */}
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
                        <p className="text-xs text-slate-400 font-semibold mb-3 flex items-center gap-2">
                            <Youtube className="w-4 h-4 text-red-400" />
                            분석한 유튜버 ({youtubers.length}명)
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {youtubers.map(yt => (
                                <a
                                    key={yt.name}
                                    href={yt.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-300 text-sm font-semibold rounded-lg transition-all"
                                >
                                    <Youtube className="w-3.5 h-3.5" />
                                    {yt.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </header>

                {/* 목차 */}
                <nav className="bg-slate-800/30 border border-slate-700 rounded-2xl p-5 mb-14">
                    <p className="text-sm font-bold text-slate-300 mb-3">📋 목차</p>
                    <ol className="space-y-2 text-sm text-slate-400">
                        <li><a href="#youtubers" className="hover:text-orange-400 transition-colors">① 유튜버별 직업 추천 상세 정리</a></li>
                        <li><a href="#disrecommend" className="hover:text-orange-400 transition-colors">② 유튜버들이 꼽은 비추천 직업</a></li>
                        <li><a href="#top10" className="hover:text-orange-400 transition-colors">③ 종합 추천 직업 TOP 10 (점수 기준)</a></li>
                    </ol>
                </nav>

                {/* ① 유튜버별 섹션 */}
                <section id="youtubers" className="mb-20 scroll-mt-20">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <Youtube className="w-9 h-9 text-red-400" />
                        유튜버별 직업 추천 상세 정리
                    </h2>
                    <p className="text-slate-400 text-sm mb-10">각 유튜버님의 링크를 눌러 원본 영상도 확인해보세요!</p>

                    <div className="space-y-10">
                        {youtubers.map((yt, i) => (
                            <Fragment key={yt.name}>
                                <div className={`bg-gradient-to-br ${yt.theme} rounded-2xl p-6 sm:p-8 border`}>
                                    {/* 유튜버 헤더 */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${yt.dot} shadow-lg`} />
                                            <h3 className="text-2xl font-black text-white">{yt.name}</h3>
                                        </div>
                                        <a
                                            href={yt.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg"
                                        >
                                            <Youtube className="w-4 h-4" />
                                            원본 영상 보기
                                        </a>
                                    </div>

                                    {/* YouTube 임베드 */}
                                    <div className="mb-6 rounded-xl overflow-hidden border border-white/10 aspect-video w-full">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${yt.videoId}`}
                                            title={`${yt.name} 직업 추천 영상`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* 추천 직업 목록 */}
                                    <div className="space-y-4">
                                        {yt.jobs.map(job => (
                                            <div key={job.name} className="bg-black/30 border border-white/10 rounded-xl p-4">
                                                <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {job.image && (
                                                            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/20 flex-shrink-0">
                                                                <Image src={job.image} alt={job.name} fill className="object-cover" />
                                                            </div>
                                                        )}
                                                        <span className="text-lg font-black text-white">{job.name}</span>
                                                        <span className="text-base">{job.score}</span>
                                                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${yt.badge}`}>{job.tag}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <p className="text-sm text-slate-200">
                                                        <span className="text-green-400 font-bold">✅ 장점: </span>
                                                        {job.reason}
                                                    </p>
                                                    {job.con && (
                                                        <p className="text-sm text-slate-300">
                                                            <span className="text-red-400 font-bold">⚠️ 단점: </span>
                                                            {job.con}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 비추천 */}
                                    {yt.disrecommend.length > 0 && (
                                        <div className="mt-5 bg-red-950/30 border border-red-500/30 rounded-xl p-4">
                                            <p className="text-xs font-bold text-red-400 mb-2 flex items-center gap-1.5">
                                                <ThumbsDown className="w-3.5 h-3.5" />
                                                {yt.name}의 비추천 직업
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {yt.disrecommend.map(d => (
                                                    <span key={d} className="px-2 py-1 bg-red-900/40 border border-red-600/40 text-red-300 text-xs rounded-lg">
                                                        ❌ {d}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* 유튜버 카드 2개마다 중간 광고 삽입 */}
                                {i < youtubers.length - 1 && (i + 1) % 2 === 0 && (
                                    <InArticleAd dataAdSlot="6849727140" className="my-10" />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-14" />

                {/* ② 비추천 직업 */}
                <section id="disrecommend" className="mb-20 scroll-mt-20">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <ThumbsDown className="w-9 h-9 text-red-400" />
                        유튜버들이 꼽은 비추천 직업
                    </h2>
                    <p className="text-slate-400 text-sm mb-8">여러 유튜버가 공통으로 언급한 비추천 직업들입니다. 취향에 따라 키울 수는 있지만 뉴비라면 주의하세요!</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {disrecommendJobs.map(job => (
                            <div key={job.name} className="bg-red-950/20 border border-red-700/30 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">❌</span>
                                    <span className="text-lg font-black text-red-300">{job.name}</span>
                                </div>
                                <p className="text-sm text-slate-300 mb-2">{job.reason}</p>
                                <p className="text-xs text-slate-500">📢 언급: {job.mentioner}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-14" />

                {/* ③ TOP 10 */}
                <section id="top10" className="mb-20 scroll-mt-20">
                    <h2 className="text-3xl sm:text-4xl font-black text-white mb-2 flex items-center gap-3">
                        <Trophy className="w-9 h-9 text-yellow-400" />
                        종합 추천 직업 TOP 10
                    </h2>
                    <p className="text-slate-400 text-sm mb-3">
                        유튜버 6명의 추천 강도와 언급 횟수를 종합해 점수화했습니다.
                    </p>
                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4 mb-10 text-xs text-slate-400 space-y-1">
                        <p>📊 <strong className="text-slate-200">점수 산정 방식</strong>: 강력 추천/1위 = 5점 · 메인 추천 = 4점 · 일반 추천 = 3점 · 서브/조건부 = 1점 · 비추천 = -2점</p>
                        <p>👥 <strong className="text-slate-200">언급 횟수</strong>: 6명 중 몇 명이 언급했는지 함께 표시</p>
                    </div>

                    <div className="space-y-6">
                        {top10.map(job => (
                            <div key={job.rank} className={`bg-gradient-to-br ${job.color} rounded-2xl p-6 sm:p-8 border shadow-xl ${job.glow}`}>
                                {/* 랭크 헤더 */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                                        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                                            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-black flex-shrink-0 ${
                                                job.rank === 1 ? 'bg-yellow-500/30 border-2 border-yellow-400' :
                                                job.rank === 2 ? 'bg-slate-400/20 border-2 border-slate-300' :
                                                job.rank === 3 ? 'bg-orange-700/30 border-2 border-orange-500' :
                                                'bg-slate-800/60 border border-slate-600'
                                            }`}>
                                                {job.rank <= 3 ? ['🥇', '🥈', '🥉'][job.rank - 1] : <span className="text-xl sm:text-3xl font-black text-white">{job.rank}</span>}
                                            </div>
                                            {/* 직업 이미지 */}
                                            {job.image && (
                                                <div className="relative w-12 h-12 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white/20 flex-shrink-0 shadow-lg">
                                                    <Image src={job.image} alt={job.name} fill className="object-cover" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                                <span className="text-xs text-slate-400 font-bold">TOP {job.rank}</span>
                                                <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-black rounded-full ${job.badgeColor}`}>{job.badge}</span>
                                            </div>
                                            <h3 className="text-xl sm:text-3xl font-black text-white">{job.name}</h3>
                                            <p className="text-xs sm:text-sm text-slate-400">{job.class}</p>
                                        </div>
                                    </div>
                                    {/* 점수 */}
                                    <div className="flex items-center gap-6 bg-black/20 sm:bg-transparent rounded-xl sm:rounded-none p-3.5 sm:p-0 justify-around sm:justify-start w-full sm:w-auto border border-white/5 sm:border-none">
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-4xl font-black text-white">{job.score}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400 font-medium">종합 점수</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-4xl font-black text-orange-400">{job.mentionCount}</div>
                                            <div className="text-[10px] sm:text-xs text-slate-400 font-medium">명 언급</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 누가 추천했나 */}
                                <div className="bg-black/30 rounded-xl p-4 mb-5">
                                    <p className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5" />
                                        추천한 유튜버
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {job.mentioners.map(m => (
                                            <span key={m} className="px-2.5 py-1 bg-white/10 border border-white/20 text-white text-xs font-semibold rounded-lg">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                    {job.note && (
                                        <p className="text-xs text-yellow-400 mt-2.5">{job.note}</p>
                                    )}
                                </div>

                                {/* 장단점 */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                                    <div className="bg-green-950/30 border border-green-600/30 rounded-xl p-4">
                                        <p className="text-xs font-bold text-green-400 mb-2.5 flex items-center gap-1.5">
                                            <ThumbsUp className="w-3.5 h-3.5" />
                                            추천 이유 (장점)
                                        </p>
                                        <ul className="space-y-1.5">
                                            {job.pros.map(p => (
                                                <li key={p} className="text-sm text-slate-200 flex items-start gap-2">
                                                    <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                                                    <span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-red-950/30 border border-red-600/30 rounded-xl p-4">
                                        <p className="text-xs font-bold text-red-400 mb-2.5 flex items-center gap-1.5">
                                            <ThumbsDown className="w-3.5 h-3.5" />
                                            단점 / 아쉬운 점
                                        </p>
                                        <ul className="space-y-1.5">
                                            {job.cons.map(c => (
                                                <li key={c} className="text-sm text-slate-200 flex items-start gap-2">
                                                    <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                                                    <span>{c}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* 추천 대상 */}
                                <div className="bg-orange-950/30 border border-orange-500/30 rounded-xl p-3.5">
                                    <p className="text-sm text-orange-300 font-bold flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        추천 대상: {job.recommend}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-14" />

                {/* 결론 */}
                <section className="mb-12">
                    <div className="bg-gradient-to-br from-orange-900/40 via-yellow-900/30 to-red-900/40 border border-orange-500/40 rounded-2xl p-8 sm:p-10">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                            <Crown className="w-8 h-8 text-yellow-400" />
                            한눈에 보는 최종 요약
                        </h2>

                        <div className="grid sm:grid-cols-3 gap-4 mb-8">
                            <div className="bg-yellow-900/40 border border-yellow-500/40 rounded-xl p-5 text-center">
                                <div className="text-4xl mb-2">🥇</div>
                                <div className="text-xl font-black text-yellow-300">렌</div>
                                <div className="text-xs text-slate-400 mt-1">전사 · 97점 · 5명 언급</div>
                                <div className="text-xs text-yellow-400 mt-2 font-bold">뉴비·복귀자 무조건 1픽</div>
                            </div>
                            <div className="bg-slate-700/40 border border-slate-400/40 rounded-xl p-5 text-center">
                                <div className="text-4xl mb-2">🥈</div>
                                <div className="text-xl font-black text-slate-200">보우마스터</div>
                                <div className="text-xs text-slate-400 mt-1">궁수 · 95점 · 5명 언급</div>
                                <div className="text-xs text-orange-400 mt-2 font-bold">조작 최하 수준 뉴비 국밥</div>
                            </div>
                            <div className="bg-orange-900/40 border border-orange-500/40 rounded-xl p-5 text-center">
                                <div className="text-4xl mb-2">🥉</div>
                                <div className="text-xl font-black text-orange-300">와일드헌터</div>
                                <div className="text-xs text-slate-400 mt-1">궁수 · 88점 · 5명 언급</div>
                                <div className="text-xs text-green-400 mt-2 font-bold">10초 무적 유틸 끝판왕</div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-slate-300">
                            <div className="flex items-start gap-3 bg-black/20 rounded-xl p-4">
                                <Flame className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white">뉴비·복귀자라면?</strong> → 렌, 보우마스터 중 하나를 무조건 추천.
                                    조작 쉽고 유틸 좋은 <strong className="text-yellow-300">렌</strong>이 전체 1위, 딜 누수 없는 <strong className="text-orange-300">보우마스터</strong>가 2위.
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-black/20 rounded-xl p-4">
                                <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white">장기 투자 본캐를 찾는다면?</strong> → 윈드브레이커, 아델, 아크 추천.
                                    고점에서 진가를 발휘하는 직업들입니다.
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-black/20 rounded-xl p-4">
                                <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <strong className="text-white">고스펙 고인물이라면?</strong> → 제논, 아크.
                                    세팅 비용이 비싸지만 그만큼 체급이 타의 추종을 불허합니다.
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 출처 */}
                <section className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
                    <h3 className="text-base font-bold text-slate-300 mb-4 flex items-center gap-2">
                        <Youtube className="w-4 h-4 text-red-400" />
                        참고 영상 출처
                    </h3>
                    <div className="space-y-2.5">
                        {youtubers.map(yt => (
                            <div key={yt.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <span className="text-sm font-bold text-white w-36 shrink-0">{yt.name}</span>
                                <a
                                    href={yt.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors break-all"
                                >
                                    {yt.link}
                                </a>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-5">
                        ※ 본 글은 각 유튜버님의 영상을 분석·요약한 콘텐츠입니다. 모든 저작권은 원 유튜버님께 있습니다.
                    </p>
                </section>

                {/* 추천 키워드 / 태그 */}
                <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold text-slate-400">
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플스토리</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플직업추천</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#하이퍼버닝직업추천</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#오버드라이브직업추천</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플하이퍼버닝</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플직업순위</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플렌</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플보우마스터</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플와일드헌터</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플레테</span>
                    <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg hover:text-orange-400 hover:border-orange-500/40 transition-colors cursor-pointer">#메이플티어표</span>
                </div>

            </article>
        </div>
    );
}
