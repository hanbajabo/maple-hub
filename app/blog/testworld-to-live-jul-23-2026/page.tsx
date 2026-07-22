'use client';

import Link from 'next/link';
import { ArrowLeft, Swords, Package, MapPin, Sparkles, Calendar, Maximize2, CheckCircle2, Gamepad2 } from 'lucide-react';

const jobSkillImageList = [
  {
    "file": "009_스킬_1341504[다크나이트(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/009_%EC%8A%A4%ED%82%AC_1341504%5B%EB%8B%A4%ED%81%AC%EB%82%98%EC%9D%B4%ED%8A%B8(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_1341504[다크나이트(6차)]_변경",
    "name": "다크나이트 (다크니스 오브 그레이스)",
    "diffs": [
      "비홀더 쇼크 적중 시 추가타 옵션에 <strong class='text-amber-300 font-bold'>'몬스터 방어율 20% 추가 무시'</strong> 효과가 본섭에서 추가 반영됨."
    ]
  },
  {
    "file": "014_스킬_2141506[아크메이지(불,독)(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/014_%EC%8A%A4%ED%82%AC_2141506%5B%EC%95%84%ED%81%AC%EB%A9%94%EC%9D%B4%EC%A7%80(%EB%B6%88%2C%EB%8F%85)(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_2141506[아크메이지(불,독)(6차)]_변경",
    "name": "아크메이지(불,독) (인페르날 웨이브)",
    "diffs": [
      "스킬 설명 툴팁의 <strong class='text-amber-300 font-bold'>'파도 공격 :'</strong> 표기가 본섭에서 <strong class='text-amber-300 font-bold'>'파도 :'</strong>로 명칭 간소화 변경됨."
    ]
  },
  {
    "file": "018_스킬_2341509[비숍(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/018_%EC%8A%A4%ED%82%AC_2341509%5B%EB%B9%84%EC%88%8D(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_2341509[비숍(6차)]_변경",
    "name": "비숍 (엔젤스 플레지)",
    "diffs": [
      "스킬 설명에 <strong class='text-amber-300 font-bold'>'일정 시간마다 적의 내면에 속죄의 낙인을 새길 수 있게 되며 속죄의 낙인은'</strong> 문구가 본섭에서 추가 명시됨."
    ]
  },
  {
    "file": "019_스킬_3341506[패스파인더(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/019_%EC%8A%A4%ED%82%AC_3341506%5B%ED%8C%A8%EC%8A%A4%ED%8C%8C%EC%9D%B8%EB%8D%94(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_3341506[패스파인더(6차)]_변경",
    "name": "패스파인더 (마테리얼 버스트)",
    "diffs": [
      "폭발 화살 데미지: 265% → <strong class='text-amber-300 font-bold'>288%</strong> (조정)",
      "렐릭 마테리아 구현 주기 및 보유 수: 2초마다 최대 7개 → <strong class='text-amber-300 font-bold'>3.5초마다 최대 6개</strong> (조정)",
      "에인션트 버스트 데미지: 797% → <strong class='text-amber-300 font-bold'>910%</strong> (조정)",
      "폭쇄 데미지: 930% → <strong class='text-amber-300 font-bold'>1056%</strong> (조정)"
    ]
  },
  {
    "file": "020_스킬_3341507[패스파인더(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/020_%EC%8A%A4%ED%82%AC_3341507%5B%ED%8C%A8%EC%8A%A4%ED%8C%8C%EC%9D%B8%EB%8D%94(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_3341507[패스파인더(6차)]_변경",
    "name": "패스파인더 (에인션트 버스트)",
    "diffs": [
      "고대 화살 데미지: 797% → <strong class='text-amber-300 font-bold'>910%</strong> (조정)",
      "폭쇄 데미지: 930% → <strong class='text-amber-300 font-bold'>1056%</strong> (조정)"
    ]
  },
  {
    "file": "022_스킬_4241507[섀도어(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/022_%EC%8A%A4%ED%82%AC_4241507%5B%EC%84%80%EB%8F%84%EC%96%B4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_4241507[섀도어(6차)]_변경",
    "name": "섀도어 6차 (무아지경)",
    "diffs": [
      "암살 : 멸 데미지: 387% → <strong class='text-amber-300 font-bold'>400%</strong> (조정)",
      "분쇄 : 멸 데미지: 1타 375% → <strong class='text-amber-300 font-bold'>388%</strong> / 2타 554% → <strong class='text-amber-300 font-bold'>567%</strong> (조정)"
    ]
  },
  {
    "file": "023_스킬_4241508[섀도어(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/023_%EC%8A%A4%ED%82%AC_4241508%5B%EC%84%80%EB%8F%84%EC%96%B4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_4241508[섀도어(6차)]_변경",
    "name": "섀도어 6차 (암살 : 멸)",
    "diffs": [
      "참격 데미지: 387% → <strong class='text-amber-300 font-bold'>400%</strong> (조정)"
    ]
  },
  {
    "file": "024_스킬_4241509[섀도어(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/024_%EC%8A%A4%ED%82%AC_4241509%5B%EC%84%80%EB%8F%84%EC%96%B4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_4241509[섀도어(6차)]_변경",
    "name": "섀도어 6차 (분쇄 : 멸)",
    "diffs": [
      "난격 데미지: 375% → <strong class='text-amber-300 font-bold'>388%</strong> (조정)",
      "검영 데미지: 554% → <strong class='text-amber-300 font-bold'>567%</strong> (조정)"
    ]
  },
  {
    "file": "026_스킬_15101026[스트라이커(2차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/026_%EC%8A%A4%ED%82%AC_15101026%5B%EC%8A%A4%ED%8A%B8%EB%9D%BC%EC%9D%B4%EC%BB%A4(2%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_15101026[스트라이커(2차)]_변경",
    "name": "스트라이커 2차 (파도)",
    "diffs": [
      "테섭에서 스킬명이 <strong class='text-amber-300 font-bold'>'(null)'</strong>로 표기되던 오류가 본섭에서 <strong class='text-amber-300 font-bold'>'파도'</strong>로 정상 수정됨."
    ]
  },
  {
    "file": "027_스킬_23141007[메르세데스(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/027_%EC%8A%A4%ED%82%AC_23141007%5B%EB%A9%94%EB%A5%B4%EC%84%B8%EB%8D%B0%EC%8A%A4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_23141007[메르세데스(6차)]_변경",
    "name": "메르세데스 (리프 토네이도 VI)",
    "diffs": [
      "패시브 효과 변경: 기존 [베리안 서지의 데미지 <strong class='text-amber-300 font-bold'>120%p</strong> 증가] → [베리안 서지의 데미지 <strong class='text-amber-300 font-bold'>750%p</strong>, 베리안 서지 : 글로리 1타의 데미지 <strong class='text-amber-300 font-bold'>300%p</strong> 증가]로 조정."
    ]
  },
  {
    "file": "028_스킬_23141012[메르세데스(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/028_%EC%8A%A4%ED%82%AC_23141012%5B%EB%A9%94%EB%A5%B4%EC%84%B8%EB%8D%B0%EC%8A%A4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_23141012[메르세데스(6차)]_변경",
    "name": "메르세데스 (거스트 다이브 VI)",
    "diffs": [
      "패시브 효과 변경: 기존 [베리안 서지의 데미지 <strong class='text-amber-300 font-bold'>480%p</strong> 증가] → [베리안 서지 : 글로리 2타의 데미지 <strong class='text-amber-300 font-bold'>1140%p</strong>, 베리안 서지 : 글로리 3타의 데미지 <strong class='text-amber-300 font-bold'>360%p</strong> 증가]로 조정."
    ]
  },
  {
    "file": "037_스킬_65141506[엔젤릭버스터(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/037_%EC%8A%A4%ED%82%AC_65141506%5B%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_65141506[엔젤릭버스터(6차)]_변경",
    "name": "엔젤릭버스터 (팝핑 하트)",
    "diffs": [
      "<strong class='text-amber-300 font-bold'>'그랜드 피날레의 음파와 축포의 함성은 3회 적중 시 1회 적중으로 간주'</strong> 조건 신설",
      "돌진하는 팬 데미지: 1388% → <strong class='text-amber-300 font-bold'>1069%</strong> (조정)",
      "응원 에너지 데미지: 1414% → <strong class='text-amber-300 font-bold'>1124%</strong> (조정)"
    ]
  },
  {
    "file": "048_스킬_101141506[제로(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/048_%EC%8A%A4%ED%82%AC_101141506%5B%EC%A0%9C%EB%A1%9C(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_101141506[제로(6차)]_변경",
    "name": "제로 6차 (타임 어소리티)",
    "diffs": [
      "시간의 메아리 잔상 데미지: 228% → <strong class='text-amber-300 font-bold'>258%</strong> (조정)",
      "발동 가능 횟수: 최대 21번 → <strong class='text-amber-300 font-bold'>15번</strong> (조정)"
    ]
  },
  {
    "file": "051_스킬_151141503[아델(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/051_%EC%8A%A4%ED%82%AC_151141503%5B%EC%95%84%EB%8D%B8(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_151141503[아델(6차)]_변경",
    "name": "아델 (에테르 뤼페)",
    "diffs": [
      "키다운 지속 공격 데미지: 500% → <strong class='text-amber-300 font-bold'>875%</strong> (조정)",
      "키다운 종료 후 에테르 소드 데미지: 1346% → <strong class='text-amber-300 font-bold'>673%</strong> (조정)"
    ]
  },
  {
    "file": "053_스킬_161140507[렌(6차)]_변경.png",
    "src": "/images/blog/ver-1-2-417/053_%EC%8A%A4%ED%82%AC_161140507%5B%EB%A0%8C(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_161140507[렌(6차)]_변경",
    "name": "렌 (창룡파천검 : 만참)",
    "diffs": [
      "재발동 대기시간: 15초 → <strong class='text-amber-300 font-bold'>5초</strong> (조정)",
      "스킬 설명에 <strong class='text-amber-300 font-bold'>'검격은 망혼검 절기 : 열지, 망혼검 절기 : 열지 VI 사용 시 준비되며 망혼검 절기 : 심검 사용 시 발동'</strong> 조건 명시"
    ]
  },
  {
    "file": "054_스킬_400021171[5차(마법사)]_변경.png",
    "src": "/images/blog/ver-1-2-417/054_%EC%8A%A4%ED%82%AC_400021171%5B5%EC%B0%A8(%EB%A7%88%EB%B2%95%EC%82%AC)%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_400021171[5차(마법사)]_변경",
    "name": "레테 (체인 커맨드)",
    "diffs": [
      "스킬 설명 문구 띄어쓰기 수정: 기존 '한 단계 씩' → <strong class='text-amber-300 font-bold'>'한 단계씩'</strong> 띄어쓰기 오기 보정"
    ]
  }
];
const miniGameSkillImageList = [
  {
    "file": "040_스킬_80004269[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/040_%EC%8A%A4%ED%82%AC_80004269%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004269[기타]_변경",
    "name": "미니게임 스킬 (디바이드)",
    "diffs": [
      "재사용 대기시간: 8초 → <strong class='text-cyan-300 font-bold'>6초</strong> (조정)"
    ]
  },
  {
    "file": "041_스킬_80004271[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/041_%EC%8A%A4%ED%82%AC_80004271%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004271[기타]_변경",
    "name": "미니게임 스킬 (데몬 베인)",
    "diffs": [
      "데미지 수치: 1500% → <strong class='text-cyan-300 font-bold'>12000%</strong> (조정)"
    ]
  },
  {
    "file": "042_스킬_80004273[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/042_%EC%8A%A4%ED%82%AC_80004273%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004273[기타]_변경",
    "name": "미니게임 스킬 (체인 라이트닝)",
    "diffs": [
      "<strong class='text-cyan-300 font-bold'>'재사용 대기시간 6초'</strong> 조건 신설 추가"
    ]
  },
  {
    "file": "043_스킬_80004276[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/043_%EC%8A%A4%ED%82%AC_80004276%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004276[기타]_변경",
    "name": "미니게임 스킬 (플레임 스윕)",
    "diffs": [
      "재사용 대기시간: 8초 → <strong class='text-cyan-300 font-bold'>6초</strong> (조정)"
    ]
  },
  {
    "file": "044_스킬_80004278[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/044_%EC%8A%A4%ED%82%AC_80004278%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004278[기타]_변경",
    "name": "미니게임 스킬 (조디악 레이)",
    "diffs": [
      "데미지 수치: 1500% → <strong class='text-cyan-300 font-bold'>12000%</strong> (조정)"
    ]
  },
  {
    "file": "045_스킬_80004281[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/045_%EC%8A%A4%ED%82%AC_80004281%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004281[기타]_변경",
    "name": "미니게임 스킬 (폭풍의 시)",
    "diffs": [
      "스킬 설명 띄어쓰기 수정: 기존 '몰아치 듯' → <strong class='text-cyan-300 font-bold'>'몰아치듯'</strong> 붙여쓰기 보정"
    ]
  },
  {
    "file": "046_스킬_80004282[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/046_%EC%8A%A4%ED%82%AC_80004282%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004282[기타]_변경",
    "name": "미니게임 스킬 (볼텍스 스피어)",
    "diffs": [
      "재사용 대기시간: 8초 → <strong class='text-cyan-300 font-bold'>6초</strong> (조정)"
    ]
  },
  {
    "file": "047_스킬_80004285[기타]_변경.png",
    "src": "/images/blog/ver-1-2-417/047_%EC%8A%A4%ED%82%AC_80004285%5B%EA%B8%B0%ED%83%80%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "스킬_80004285[기타]_변경",
    "name": "미니게임 스킬 (드래곤 버스트)",
    "diffs": [
      "데미지 수치: 1200% → <strong class='text-cyan-300 font-bold'>10000%</strong> (조정)"
    ]
  }
];
const itemImageList = [
  {
    "file": "055_아이템_2639051[소비]_변경.png",
    "src": "/images/blog/ver-1-2-417/055_%EC%95%84%EC%9D%B4%ED%85%9C_2639051%5B%EC%86%8C%EB%B9%84%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "아이템_2639051[소비]_변경",
    "desc": "챌린저스 4레벨 특수 스킬 반지 선택권: 선택권 유의사항에 '- 챌린저스 4레벨 특수 스킬 반지 선택권으로 선택한 반지와 동일한 종류의 링은 챌린저스 3레벨 특수 스킬 반지 선택권에서 선택할 수 없다.' 조건 신설"
  },
  {
    "file": "056_아이템_2832310[소비]_변경.png",
    "src": "/images/blog/ver-1-2-417/056_%EC%95%84%EC%9D%B4%ED%85%9C_2832310%5B%EC%86%8C%EB%B9%84%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "아이템_2832310[소비]_변경",
    "desc": "챌린저스 3레벨 특수 스킬 반지 선택권: 선택권 유의사항에 '- 챌린저스 3레벨 특수 스킬 반지 선택권으로 선택한 반지와 동일한 종류의 링은 챌린저스 4레벨 특수 스킬 반지 선택권에서 선택할 수 없다.' 조건 신설"
  },
  {
    "file": "057_아이템_2832874[소비]_변경.png",
    "src": "/images/blog/ver-1-2-417/057_%EC%95%84%EC%9D%B4%ED%85%9C_2832874%5B%EC%86%8C%EB%B9%84%5D_%EB%B3%80%EA%B2%BD.png",
    "title": "아이템_2832874[소비]_변경",
    "desc": "사소한 변경점 선택권: 지급 부위 설명 문구 오기 수정 ('아래 얼굴장식 중 1종' → '아래 눈장식 중 1종')"
  },
  {
    "file": "058_아이템_2832947[소비]_추가.png",
    "src": "/images/blog/ver-1-2-417/058_%EC%95%84%EC%9D%B4%ED%85%9C_2832947%5B%EC%86%8C%EB%B9%84%5D_%EC%B6%94%EA%B0%80.png",
    "title": "아이템_2832947[소비]_추가",
    "desc": "신규 소비 아이템 2832947: 이벤트 보상 관련 아이템 신규 추가."
  },
  {
    "file": "059_아이템_4310497[기타]_추가.png",
    "src": "/images/blog/ver-1-2-417/059_%EC%95%84%EC%9D%B4%ED%85%9C_4310497%5B%EA%B8%B0%ED%83%80%5D_%EC%B6%94%EA%B0%80.png",
    "title": "아이템_4310497[기타]_추가",
    "desc": "신규 기타 아이템 4310497: 신규 이벤트 코인 재화 추가."
  },
  {
    "file": "060_아이템_5150278[캐시]_추가.png",
    "src": "/images/blog/ver-1-2-417/060_%EC%95%84%EC%9D%B4%ED%85%9C_5150278%5B%EC%BA%90%EC%8B%9C%5D_%EC%B6%94%EA%B0%80.png",
    "title": "아이템_5150278[캐시]_추가",
    "desc": "신규 캐시 아이템 5150278: 신규 성형/헤어 쿠폰 추가."
  },
  {
    "file": "061_아이템_5152433[캐시]_추가.png",
    "src": "/images/blog/ver-1-2-417/061_%EC%95%84%EC%9D%B4%ED%85%9C_5152433%5B%EC%BA%90%EC%8B%9C%5D_%EC%B6%94%EA%B0%80.png",
    "title": "아이템_5152433[캐시]_추가",
    "desc": "신규 캐시 아이템 5152433: 신규 코디 캐시 아이템 추가."
  }
];
const mapImageList = [
  {
    "file": "062_맵_410007530_변경.png",
    "src": "/images/blog/ver-1-2-417/062_%EB%A7%B5_410007530_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_410007530_변경",
    "desc": "맵 410007530: 발판 지형 레이아웃 및 NPC 배치 조정."
  },
  {
    "file": "066_맵_993299938_변경.png",
    "src": "/images/blog/ver-1-2-417/066_%EB%A7%B5_993299938_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299938_변경",
    "desc": "맵 993299938: 이벤트 맵 배경 및 오브젝트 배치 조정."
  },
  {
    "file": "067_맵_993299972_변경.png",
    "src": "/images/blog/ver-1-2-417/067_%EB%A7%B5_993299972_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299972_변경",
    "desc": "맵 993299972: 대기열 포탈 위치 미세 조정."
  },
  {
    "file": "068_맵_993299979_변경.png",
    "src": "/images/blog/ver-1-2-417/068_%EB%A7%B5_993299979_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299979_변경",
    "desc": "맵 993299979: 사냥터 지형 및 몬스터 젠 좌표 조정."
  },
  {
    "file": "069_맵_993299981_변경.png",
    "src": "/images/blog/ver-1-2-417/069_%EB%A7%B5_993299981_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299981_변경",
    "desc": "맵 993299981: 젠 동선 레이아웃 조정."
  },
  {
    "file": "070_맵_993299982_변경.png",
    "src": "/images/blog/ver-1-2-417/070_%EB%A7%B5_993299982_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299982_변경",
    "desc": "맵 993299982: 미니게임 UI 레이아웃 위치 조정."
  },
  {
    "file": "071_맵_993299985_변경.png",
    "src": "/images/blog/ver-1-2-417/071_%EB%A7%B5_993299985_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299985_변경",
    "desc": "맵 993299985: 보스 진입로 지형 배치 조정."
  },
  {
    "file": "072_맵_993299991_변경.png",
    "src": "/images/blog/ver-1-2-417/072_%EB%A7%B5_993299991_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993299991_변경",
    "desc": "맵 993299991: 레이아웃 좌표 조정."
  },
  {
    "file": "077_맵_993302009_변경.png",
    "src": "/images/blog/ver-1-2-417/077_%EB%A7%B5_993302009_%EB%B3%80%EA%B2%BD.png",
    "title": "맵_993302009_변경",
    "desc": "맵 993302009: 최종 이벤트 맵 배경 오브젝트 조정."
  }
];

export default function TestworldToLiveJul23Page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Navigation Header */}
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">블로그 목록으로 돌아가기</span>
                    </Link>
                    <span className="text-xs text-amber-400 font-semibold px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30">
                        ver 1.2.417 본섭 변경점 총정리
                    </span>
                </div>
            </div>

            {/* Article */}
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Header */}
                <header className="mb-10 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1">
                            🍁 업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            ver 1.2.417
                        </span>
                        <span className="text-slate-400 text-sm flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> 2026년 7월 23일
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        [ver 1.2.417] 테섭 → 본섭 변경점 총정리
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        테스터 서버(테섭) 대비 본 서버(본섭) 상경 과정에서 변경된 총 40개 실질 변경점(직업 스킬 16종, 미니게임 스킬 8종, 아이템 7종, 맵 지형 9종)을 1:1 대조하여 분석합니다.
                    </p>
                </header>

                {/* Section 1: Job Skill Balance Images */}
                <section className="mb-16 space-y-10">
                    <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                        <Swords className="w-8 h-8 text-amber-400" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">1. 직업별 스킬 변경 사항 ({jobSkillImageList.length}개)</h2>
                            <p className="text-sm text-slate-400">다크나이트, 불독, 비숍, 패스파인더, 섀도어(무아지경), 메르세데스, 제로, 아델, 렌 등 직업 스킬 1:1 대조</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {jobSkillImageList.map((img, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all p-6 shadow-xl">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-amber-400 px-3 py-1 bg-amber-500/10 rounded-md border border-amber-500/20">
                                            스킬 #{idx + 1}
                                        </span>
                                        <span className="text-lg font-bold text-slate-100">{img.name || img.title}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Maximize2 className="w-3.5 h-3.5" /> 원본 해상도
                                    </span>
                                </div>

                                {/* Image Box */}
                                <div className="w-full bg-slate-950 rounded-xl overflow-x-auto border border-slate-800 p-4 flex justify-center mb-5">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="max-w-none h-auto block rounded-md"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Detailed Diff Analysis Box */}
                                <div className="bg-slate-950/80 rounded-xl border border-amber-500/30 p-4 sm:p-5">
                                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-3">
                                        <CheckCircle2 className="w-4 h-4 text-amber-400" /> 🔍 이미지 1:1 대조 결과
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-200">
                                        {img.diffs.map((diffItem, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2">
                                                <span className="text-amber-400 font-bold">•</span>
                                                <span dangerouslySetInnerHTML={{ __html: diffItem }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Mini-Game Skill Adjustments */}
                <section className="mb-16 space-y-10">
                    <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                        <Gamepad2 className="w-8 h-8 text-cyan-400" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">2. 미니게임 스킬 조정 ({miniGameSkillImageList.length}개)</h2>
                            <p className="text-sm text-slate-400">울티마 스쿼드 및 이벤트 미니게임 스킬 8종 전체 수치/쿨타임 대조 (디바이드, 데몬베인, 체라, 플스, 조디악, 폭시, 볼텍스, 드버)</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        {miniGameSkillImageList.map((img, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all p-6 shadow-xl">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-cyan-400 px-3 py-1 bg-cyan-500/10 rounded-md border border-cyan-500/20">
                                            미니게임 #{idx + 1}
                                        </span>
                                        <span className="text-lg font-bold text-slate-100">{img.name || img.title}</span>
                                    </div>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Maximize2 className="w-3.5 h-3.5" /> 원본 해상도
                                    </span>
                                </div>

                                {/* Image Box */}
                                <div className="w-full bg-slate-950 rounded-xl overflow-x-auto border border-slate-800 p-4 flex justify-center mb-5">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="max-w-none h-auto block rounded-md"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Detailed Diff Analysis Box */}
                                <div className="bg-slate-950/80 rounded-xl border border-cyan-500/30 p-4 sm:p-5">
                                    <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-3">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 🔍 미니게임 스킬 1:1 대조 결과
                                    </h4>
                                    <ul className="space-y-2 text-sm text-slate-200">
                                        {img.diffs.map((diffItem, dIdx) => (
                                            <li key={dIdx} className="flex items-start gap-2">
                                                <span className="text-cyan-400 font-bold">•</span>
                                                <span dangerouslySetInnerHTML={{ __html: diffItem }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Item Images */}
                <section className="mb-16 space-y-10">
                    <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                        <Package className="w-8 h-8 text-emerald-400" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">3. 아이템 변경 & 신규 추가 ({itemImageList.length}개)</h2>
                            <p className="text-sm text-slate-400">소비, 기타, 캐시 아이템 대조</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {itemImageList.map((img, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all p-5 shadow-xl">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-emerald-400 px-3 py-1 bg-emerald-500/10 rounded-md border border-emerald-500/20">
                                            아이템 #{idx + 1}
                                        </span>
                                        <span className="text-base font-bold text-slate-100">{img.title}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-950 rounded-xl overflow-x-auto border border-slate-800 p-4 flex justify-center mb-4">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="max-w-none h-auto block rounded-md"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="bg-slate-950/80 rounded-xl border border-emerald-500/30 p-4 text-sm text-slate-200">
                                    <strong className="text-emerald-400">💡 대조: </strong>{img.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Map Images */}
                <section className="mb-16 space-y-10">
                    <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                        <MapPin className="w-8 h-8 text-rose-400" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">4. 맵 지형 및 구조 변경 ({mapImageList.length}개)</h2>
                            <p className="text-sm text-slate-400">지형 및 레이아웃 대조</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {mapImageList.map((img, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all p-5 shadow-xl">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-rose-400 px-3 py-1 bg-rose-500/10 rounded-md border border-rose-500/20">
                                            맵 #{idx + 1}
                                        </span>
                                        <span className="text-base font-bold text-slate-100">{img.title}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-950 rounded-xl overflow-x-auto border border-slate-800 p-4 flex justify-center mb-4">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="max-w-none h-auto block rounded-md"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="bg-slate-950/80 rounded-xl border border-rose-500/30 p-4 text-sm text-slate-200">
                                    <strong className="text-rose-400">💡 대조: </strong>{img.desc}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Banner */}
                <footer className="mt-16 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm mb-4">
                        더 자세한 캐릭터 스펙 계산 및 아이템 효율 진단은 <strong>maple.ai.kr</strong> 메인 페이지에서 이용하실 수 있습니다.
                    </p>
                    <Link prefetch={false}
                        href="/blog"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/20"
                    >
                        블로그 목록으로 이동하기
                    </Link>
                </footer>
            </article>
        </div>
    );
}
