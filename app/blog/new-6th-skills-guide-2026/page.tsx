'use client';

import Link from 'next/link';
import { ArrowLeft, Swords, Calendar, Maximize2, CheckCircle2, AlertCircle } from 'lucide-react';

const skillList = [
  {
    "id": 1,
    "job": "히어로",
    "skillName": "레이지 익스플로젼",
    "src": "/images/blog/new-6th-skills-2026/001_%ED%9E%88%EC%96%B4%EB%A1%9C_%EB%A0%88%EC%9D%B4%EC%A7%80%20%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EC%A0%BC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 2,
    "job": "팔라딘",
    "skillName": "디바인 컨버전스",
    "src": "/images/blog/new-6th-skills-2026/002_%ED%8C%94%EB%9D%BC%EB%94%98_%EB%94%94%EB%B0%94%EC%9D%B8%20%EC%BB%A8%EB%B2%84%EC%A0%84%EC%8A%A4.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. <strong class='text-amber-300 font-bold'>1타</strong>, <strong class='text-amber-300 font-bold'>2타</strong>, <strong class='text-amber-300 font-bold'>3타</strong> 스킬입니다."
  },
  {
    "id": 3,
    "job": "다크나이트",
    "skillName": "다크니스 오브 그레이스",
    "src": "/images/blog/ver-1-2-417/009_%EC%8A%A4%ED%82%AC_1341504%5B%EB%8B%A4%ED%81%AC%EB%82%98%EC%9D%B4%ED%8A%B8(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 지속 중 배경이 바뀌며 <strong class='text-amber-300 font-bold'>1회</strong>에 한해 5차 스킬의 비홀더 임팩트가 <strong class='text-amber-300 font-bold'>강화됩니다</strong>.",
    "liveChange": "비홀더 쇼크 적중 시 추가타 옵션에 '몬스터 방어율 <strong class='text-amber-300 font-bold'>20%</strong> 추가 무시' 효과가 본섭에서 추가 반영되었습니다."
  },
  {
    "id": 4,
    "job": "불독",
    "skillName": "인페르날 웨이브",
    "src": "/images/blog/ver-1-2-417/014_%EC%8A%A4%ED%82%AC_2141506%5B%EC%95%84%ED%81%AC%EB%A9%94%EC%9D%B4%EC%A7%80(%EB%B6%88%2C%EB%8F%85)(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> <strong class='text-amber-300 font-bold'>버프 스킬</strong>입니다. <strong class='text-amber-300 font-bold'>버프</strong> 지속 중 <strong class='text-amber-300 font-bold'>자동 발동</strong> 스킬입니다.",
    "liveChange": "스킬 설명 툴팁의 '파도 공격 :' 표기가 '파도 :'로 명칭 간소화 변경되었습니다."
  },
  {
    "id": 5,
    "job": "썬콜",
    "skillName": "서브제로 퍼미네이션",
    "src": "/images/blog/new-6th-skills-2026/005_%EC%8D%AC%EC%BD%9C_%EC%84%9C%EB%B8%8C%EC%A0%9C%EB%A1%9C%20%ED%8D%BC%EB%AF%B8%EB%84%A4%EC%9D%B4%EC%85%98.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>40초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. 공격 스킬 적중 시 쿨타임이 <strong class='text-amber-300 font-bold'>3초</strong> 감소하며 <strong class='text-amber-300 font-bold'>15초</strong> 미만으로는 감소 불가능합니다."
  },
  {
    "id": 6,
    "job": "비숍",
    "skillName": "엔젤스 플레지",
    "src": "/images/blog/ver-1-2-417/018_%EC%8A%A4%ED%82%AC_2341509%5B%EB%B9%84%EC%88%8D(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. <strong class='text-amber-300 font-bold'>20초</strong>마다 직접 사용하는 스킬 적중 시 낙인이 생성됩니다.",
    "liveChange": "스킬 설명에 '일정 시간마다 적의 내면에 속죄의 낙인을 새길 수 있게 되며 속죄의 낙인은' 문구가 본섭에서 추가 명시되었습니다."
  },
  {
    "id": 7,
    "job": "보우마스터",
    "skillName": "아이 오브 아퀼라",
    "src": "/images/blog/new-6th-skills-2026/007_%EB%B3%B4%EC%9A%B0%EB%A7%88%EC%8A%A4%ED%84%B0_%EC%95%84%EC%9D%B4%20%EC%98%A4%EB%B8%8C%20%EC%95%84%ED%80%BC%EB%9D%BC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>30초</strong> 쿨타임 스킬입니다. <strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다."
  },
  {
    "id": 8,
    "job": "신궁",
    "skillName": "리썰 퍼니셔",
    "src": "/images/blog/new-6th-skills-2026/008_%EC%8B%A0%EA%B6%81_%EB%A6%AC%EC%8D%B0%20%ED%8D%BC%EB%8B%88%EC%85%94.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. <strong class='text-amber-300 font-bold'>버프</strong> 지속시간 중 <strong class='text-amber-300 font-bold'>16회</strong>의 추가타가 발생합니다. <strong class='text-amber-300 font-bold'>16회</strong>를 전부 소진 후 스킬을 재사용하여 막타 스킬을 발동 가능합니다."
  },
  {
    "id": 9,
    "job": "패스파인더",
    "skillName": "마테리얼 버스트",
    "src": "/images/blog/ver-1-2-417/019_%EC%8A%A4%ED%82%AC_3341506%5B%ED%8C%A8%EC%8A%A4%ED%8C%8C%EC%9D%B8%EB%8D%94(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "스킬은 렐릭 마테리아를 소모합니다. 렐릭 마테리아는 <strong class='text-amber-300 font-bold'>2초</strong>마다 <strong class='text-amber-300 font-bold'>1개</strong>씩 생성되며 <strong class='text-amber-300 font-bold'>7개</strong>까지 보유 가능합니다.",
    "liveChange": "폭발 화살 <strong class='text-amber-300 font-bold'>288%</strong>, 렐릭 마테리아 <strong class='text-amber-300 font-bold'>3.5초</strong>마다 최대 <strong class='text-amber-300 font-bold'>6개</strong>, 에인션트 버스트 <strong class='text-amber-300 font-bold'>910%</strong>, 폭쇄 <strong class='text-amber-300 font-bold'>1056%</strong>로 <strong class='text-amber-300 font-bold'>조정</strong>되었습니다."
  },
  {
    "id": 10,
    "job": "나이트로드",
    "skillName": "쉐도우 리츄얼",
    "src": "/images/blog/new-6th-skills-2026/010_%EB%82%98%EC%9D%B4%ED%8A%B8%EB%A1%9C%EB%93%9C_%EC%89%90%EB%8F%84%EC%9A%B0%20%EB%A6%AC%EC%B8%84%EC%96%BC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. <strong class='text-amber-300 font-bold'>1타</strong>, <strong class='text-amber-300 font-bold'>2타</strong> 스킬입니다."
  },
  {
    "id": 11,
    "job": "섀도어",
    "skillName": "무아지경",
    "src": "/images/blog/ver-1-2-417/022_%EC%8A%A4%ED%82%AC_4241507%5B%EC%84%80%EB%8F%84%EC%96%B4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 사용 시 <strong class='text-amber-300 font-bold'>30회</strong> 동안 암살/분쇄 스킬이 <strong class='text-amber-300 font-bold'>강화됩니다</strong>. 지속시간 중 메소 익스플로젼 스킬이 자동으로 발동됩니다.",
    "liveChange": "무아지경 - 참격/난격/검영 데미지가 본섭에서 각각 <strong class='text-amber-300 font-bold'>400%</strong> / <strong class='text-amber-300 font-bold'>388%</strong> / <strong class='text-amber-300 font-bold'>567%</strong>로 <strong class='text-amber-300 font-bold'>조정</strong>되었습니다."
  },
  {
    "id": 14,
    "job": "듀얼블레이드",
    "skillName": "암영난참",
    "src": "/images/blog/new-6th-skills-2026/014_%EB%93%80%EC%96%BC%EB%B8%94%EB%A0%88%EC%9D%B4%EB%93%9C_%EC%95%94%EC%98%81%EB%82%9C%EC%B0%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>30초</strong> 쿨타임 패시브 스킬 스킬 3 / 6 / <strong class='text-amber-300 font-bold'>9회</strong> ��중 시 사출기가 발동 최종 완성 시 <strong class='text-amber-300 font-bold'>30초</strong>의 쿨타임이 적용되며 직접 공격하는 스킬 <strong class='text-amber-300 font-bold'>45회</strong> 적중 시 쿨타임 <strong class='text-amber-300 font-bold'>25초</strong> 감소"
  },
  {
    "id": 15,
    "job": "바이퍼",
    "skillName": "넵투누스 어드밴트",
    "src": "/images/blog/new-6th-skills-2026/015_%EB%B0%94%EC%9D%B4%ED%8D%BC_%EB%84%B5%ED%88%AC%EB%88%84%EC%8A%A4%20%EC%96%B4%EB%93%9C%EB%B0%B4%ED%8A%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 사용 시 서펜트 스톤을 최대로 획득합니다. 추가타인 수룡은 <strong class='text-amber-300 font-bold'>8번</strong>까지 돌진하며, 넵투누스 어썰트 스킬은 <strong class='text-amber-300 font-bold'>2번</strong>까지 발동합니다."
  },
  {
    "id": 16,
    "job": "캡틴",
    "skillName": "에어리얼 봄바드먼트",
    "src": "/images/blog/new-6th-skills-2026/016_%EC%BA%A1%ED%8B%B4_%EC%97%90%EC%96%B4%EB%A6%AC%EC%96%BC%20%EB%B4%84%EB%B0%94%EB%93%9C%EB%A8%BC%ED%8A%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다."
  },
  {
    "id": 17,
    "job": "캐논슈터",
    "skillName": "메가 캐논 봄바드",
    "src": "/images/blog/new-6th-skills-2026/017_%EC%BA%90%EB%85%BC%EC%8A%88%ED%84%B0_%EB%A9%94%EA%B0%80%20%EC%BA%90%EB%85%BC%20%EB%B4%84%EB%B0%94%EB%93%9C.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다."
  },
  {
    "id": 18,
    "job": "미하일",
    "skillName": "레디언스 오브 발러",
    "src": "/images/blog/new-6th-skills-2026/018_%EB%AF%B8%ED%95%98%EC%9D%BC_%EB%A0%88%EB%94%94%EC%96%B8%EC%8A%A4%20%EC%98%A4%EB%B8%8C%20%EB%B0%9C%EB%9F%AC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 직접 사용하는 스킬 적중 시 <strong class='text-amber-300 font-bold'>20초</strong>마다 용기의 방패 <strong class='text-amber-300 font-bold'>1개</strong>가 생성됩니다."
  },
  {
    "id": 19,
    "job": "소울마스터",
    "skillName": "셀레스티얼 클리브",
    "src": "/images/blog/new-6th-skills-2026/019_%EC%86%8C%EC%9A%B8%EB%A7%88%EC%8A%A4%ED%84%B0_%EC%85%80%EB%A0%88%EC%8A%A4%ED%8B%B0%EC%96%BC%20%ED%81%B4%EB%A6%AC%EB%B8%8C.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. <strong class='text-amber-300 font-bold'>1타</strong>,<strong class='text-amber-300 font-bold'>2타</strong> 스킬입니다."
  },
  {
    "id": 20,
    "job": "플레임위자드",
    "skillName": "이그니스 레퀴엠",
    "src": "/images/blog/new-6th-skills-2026/020_%ED%94%8C%EB%A0%88%EC%9E%84%EC%9C%84%EC%9E%90%EB%93%9C_%EC%9D%B4%EA%B7%B8%EB%8B%88%EC%8A%A4%20%EB%A0%88%ED%80%B4%EC%97%A0.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다."
  },
  {
    "id": 21,
    "job": "윈드브레이커",
    "skillName": "실프스 브레스",
    "src": "/images/blog/new-6th-skills-2026/021_%EC%9C%88%EB%93%9C%EB%B8%8C%EB%A0%88%EC%9D%B4%EC%BB%A4_%EC%8B%A4%ED%94%84%EC%8A%A4%20%EB%B8%8C%EB%A0%88%EC%8A%A4.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 22,
    "job": "나이트워커",
    "skillName": "싱귤래러티 스로우",
    "src": "/images/blog/new-6th-skills-2026/022_%EB%82%98%EC%9D%B4%ED%8A%B8%EC%9B%8C%EC%BB%A4_%EC%8B%B1%EA%B7%A4%EB%9E%98%EB%9F%AC%ED%8B%B0%20%EC%8A%A4%EB%A1%9C%EC%9A%B0.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 23,
    "job": "스트라이커",
    "skillName": "해황폭쇄",
    "src": "/images/blog/new-6th-skills-2026/023_%EC%8A%A4%ED%8A%B8%EB%9D%BC%EC%9D%B4%EC%BB%A4_%ED%95%B4%ED%99%A9%ED%8F%AD%EC%87%84.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. 사용 후 <strong class='text-amber-300 font-bold'>20초</strong> 안에 누르면 되는 <strong class='text-amber-300 font-bold'>2타</strong> 스킬입니다."
  },
  {
    "id": 24,
    "job": "아란",
    "skillName": "마하 언리시드",
    "src": "/images/blog/new-6th-skills-2026/024_%EC%95%84%EB%9E%80_%EB%A7%88%ED%95%98%20%EC%96%B8%EB%A6%AC%EC%8B%9C%EB%93%9C.png",
    "originalDesc": "아드레날린 부스트 진입 시 비욘더를 <strong class='text-amber-300 font-bold'>강화</strong>합니다. 비욘더 <strong class='text-amber-300 font-bold'>3타</strong>를 사용 시 파이널 비욘더-백호(막타) 또한 <strong class='text-amber-300 font-bold'>강화됩니다</strong>. 파이널 비욘더-백호는 <strong class='text-amber-300 font-bold'>5.4초</strong>의 쿨타임이 있습니다."
  },
  {
    "id": 25,
    "job": "에반",
    "skillName": "드래곤 소어",
    "src": "/images/blog/new-6th-skills-2026/025_%EC%97%90%EB%B0%98_%EB%93%9C%EB%9E%98%EA%B3%A4%20%EC%86%8C%EC%96%B4.png",
    "originalDesc": "조디악 레이 지속 시간 동안 <strong class='text-amber-300 font-bold'>1회</strong> 사용 가능한 스킬입니다. 5차 드래곤 브레이크가 <strong class='text-amber-300 font-bold'>강화됩니다</strong>."
  },
  {
    "id": 26,
    "job": "에반",
    "skillName": "버티컬 피니셔 & 소어-돌아와!",
    "src": "/images/blog/new-6th-skills-2026/026_evan_vertical_finisher.png",
    "originalDesc": "미르가 드래곤 소어 시전 중 엘리멘탈 블래스트 사용 시 <strong class='text-amber-300 font-bold'>버티컬 피니셔</strong>가 발동하며 [돌아와] 사용 시 <strong class='text-amber-300 font-bold'>소어-돌아와!</strong>가 추가 발동합니다."
  },
  {
    "id": 27,
    "job": "루미너스",
    "skillName": "앱솔루트 스페이스",
    "src": "/images/blog/new-6th-skills-2026/027_%EB%A3%A8%EB%AF%B8%EB%84%88%EC%8A%A4_%EC%95%B1%EC%86%94%EB%A3%A8%ED%8A%B8%20%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4.png",
    "originalDesc": "이퀄브리엄 상태에서 사용 가능한 스킬입니다."
  },
  {
    "id": 28,
    "job": "메르세데스",
    "skillName": "베리안 서지",
    "src": "/images/blog/ver-1-2-417/029_%EC%8A%A4%ED%82%AC_23141506%5B%EB%A9%94%EB%A5%B4%EC%84%B8%EB%8D%B0%EC%8A%A4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "엘리멘탈 고스트 지속시간 중 스킬이 <strong class='text-amber-300 font-bold'>강화</strong>합니다. 거스트 다이브, 라이트닝 엣지, 롤링 문썰트, 레전드리 스피어로 연계가 가능합니다.",
    "liveChange": "베리안 서지의 데미지가 <strong class='text-amber-300 font-bold'>830%</strong>로 <strong class='text-amber-300 font-bold'>조정</strong>되었습니다."
  },
  {
    "id": 29,
    "job": "메르세데스",
    "skillName": "베리안 서지 : 글로리",
    "src": "/images/blog/ver-1-2-417/030_%EC%8A%A4%ED%82%AC_23141507%5B%EB%A9%94%EB%A5%B4%EC%84%B8%EB%8D%B0%EC%8A%A4(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "엘리멘탈 고스트 지속시간 중 스킬이 <strong class='text-amber-300 font-bold'>강화</strong>합니다. 거스트 다이브, 라이트닝 엣지, 롤링 문썰트, 레전드리 스피어로 연계가 가능합니다.",
    "liveChange": "베리안 서지 : 글로리 <strong class='text-amber-300 font-bold'>1/2/3타</strong> 데미지가 본섭에 맞춰 정밀 <strong class='text-amber-300 font-bold'>조정</strong>되었습니다. (<strong class='text-amber-300 font-bold'>818%</strong>/<strong class='text-amber-300 font-bold'>1440%</strong>/<strong class='text-amber-300 font-bold'>680%</strong> -> <strong class='text-amber-300 font-bold'>790%</strong>/<strong class='text-amber-300 font-bold'>1450%</strong>/<strong class='text-amber-300 font-bold'>667%</strong>)"
  },
  {
    "id": 30,
    "job": "팬텀",
    "skillName": "플레슈 르투르",
    "src": "/images/blog/new-6th-skills-2026/030_%ED%8C%AC%ED%85%80_%ED%94%8C%EB%A0%88%EC%8A%88%20%EB%A5%B4%ED%88%AC%EB%A5%B4.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 31,
    "job": "은월",
    "skillName": "연우 격풍",
    "src": "/images/blog/new-6th-skills-2026/031_%EC%9D%80%EC%9B%94_%EC%97%B0%EC%9A%B0%20%EA%B2%A9%ED%92%8D.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 32,
    "job": "블래스터",
    "skillName": "오버히트 펀치",
    "src": "/images/blog/new-6th-skills-2026/032_%EB%B8%94%EB%9E%98%EC%8A%A4%ED%84%B0_%EC%98%A4%EB%B2%84%ED%9E%88%ED%8A%B8%20%ED%8E%80%EC%B9%98.png",
    "originalDesc": "평딜 보조기 스킬입니다."
  },
  {
    "id": 33,
    "job": "배틀메이지",
    "skillName": "모티스 엣지",
    "src": "/images/blog/new-6th-skills-2026/033_%EB%B0%B0%ED%8B%80%EB%A9%94%EC%9D%B4%EC%A7%80_%EB%AA%A8%ED%8B%B0%EC%8A%A4%20%EC%97%A3%EC%A7%80.png",
    "originalDesc": "5차 스킬 유니온 오라의 사신의 낫이 <strong class='text-amber-300 font-bold'>10회</strong> <strong class='text-amber-300 font-bold'>강화됩니다</strong>."
  },
  {
    "id": 35,
    "job": "와일드헌터",
    "skillName": "레조넌스 : 와일드 피어스",
    "src": "/images/blog/new-6th-skills-2026/035_%EC%99%80%EC%9D%BC%EB%93%9C%ED%97%8C%ED%84%B0_%EB%A0%88%EC%A1%B0%EB%84%8C%EC%8A%A4%20_%20%EC%99%80%EC%9D%BC%EB%93%9C%20%ED%94%BC%EC%96%B4%EC%8A%A4.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>40초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다. 어나더 바이트의 추가 공격이 발동 시 쿨타임이 <strong class='text-amber-300 font-bold'>2.5초</strong> 감소합니다. *<strong class='text-amber-300 font-bold'>30초</strong> 미만으로는 감소 불가능합니다."
  },
  {
    "id": 36,
    "job": "제논",
    "skillName": "레일 건 캐노네이드",
    "src": "/images/blog/new-6th-skills-2026/036_%EC%A0%9C%EB%85%BC_%EB%A0%88%EC%9D%BC%20%EA%B1%B4%20%EC%BA%90%EB%85%B8%EB%84%A4%EC%9D%B4%EB%93%9C.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>15초</strong> 쿨타임의 추가타 스킬입니다."
  },
  {
    "id": 37,
    "job": "메카닉",
    "skillName": "버스터 스테이션",
    "src": "/images/blog/new-6th-skills-2026/037_%EB%A9%94%EC%B9%B4%EB%8B%89_%EB%B2%84%EC%8A%A4%ED%84%B0%20%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%85%98.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임의 <strong class='text-amber-300 font-bold'>극딜</strong> <strong class='text-amber-300 font-bold'>버프 스킬</strong>입니다 사용 시 <strong class='text-amber-300 font-bold'>5초</strong>동안 스테이션이 설치되며 최대 발사 개수 도달 시 자동 종료됩니다."
  },
  {
    "id": 38,
    "job": "데몬슬레이어",
    "skillName": "래쓰 오브 세이튼",
    "src": "/images/blog/new-6th-skills-2026/038_%EB%8D%B0%EB%AA%AC%EC%8A%AC%EB%A0%88%EC%9D%B4%EC%96%B4_%EB%9E%98%EC%93%B0%20%EC%98%A4%EB%B8%8C%20%EC%84%B8%EC%9D%B4%ED%8A%BC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 39,
    "job": "데몬어벤져",
    "skillName": "래쓰 오브 세이튼",
    "src": "/images/blog/new-6th-skills-2026/039_%EB%8D%B0%EB%AA%AC%EC%96%B4%EB%B2%A4%EC%A0%B8_%EB%9E%98%EC%93%B0%20%EC%98%A4%EB%B8%8C%20%EC%84%B8%EC%9D%B4%ED%8A%BC.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 키다운 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 키다운 종료 후 막타 스킬이 발생합니다. <strong class='text-amber-300 font-bold'>15초</strong> 쿨타임의 추가타 패시브가 있습니다."
  },
  {
    "id": 40,
    "job": "카이저",
    "skillName": "드라코닉 익스팅션",
    "src": "/images/blog/new-6th-skills-2026/040_%EC%B9%B4%EC%9D%B4%EC%A0%80_%EB%93%9C%EB%9D%BC%EC%BD%94%EB%8B%89%20%EC%9D%B5%EC%8A%A4%ED%8C%85%EC%85%98.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 키다운 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 키다운이 끝나면 화염의 화신이 등장합니다."
  },
  {
    "id": 43,
    "job": "카데나",
    "skillName": "체인아츠:토렌트",
    "src": "/images/blog/new-6th-skills-2026/043_%EC%B9%B4%EB%8D%B0%EB%82%98_%EC%B2%B4%EC%9D%B8%EC%95%84%EC%B8%A0_%ED%86%A0%EB%A0%8C%ED%8A%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>버프</strong> 지속시간 중 메일스트롬 or 오드넌스 스킬을 누르면 발동합니다."
  },
  {
    "id": 44,
    "job": "엔젤릭버스터",
    "skillName": "팝핑 하트",
    "src": "/images/blog/ver-1-2-417/037_%EC%8A%A4%ED%82%AC_65141506%5B%EC%97%94%EC%A0%A4%EB%A6%AD%EB%B2%84%EC%8A%A4%ED%84%B0(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임의 극��� <strong class='text-amber-300 font-bold'>버프 스킬</strong>입니다 엔젤릭 버스터 공격 <strong class='text-amber-300 font-bold'>6회</strong> 적중 시 팬 1명이 등장합니다 8명을 모으면 자동으로 막타가 발동합니다.",
    "liveChange": "'그랜드 피날레의 음파와 축포의 함성은 <strong class='text-amber-300 font-bold'>3회</strong> 적중 시 <strong class='text-amber-300 font-bold'>1회</strong> 적중으로 간주' 조건이 본섭에서 <strong class='text-amber-300 font-bold'>신설</strong>되었습니다."
  },
  {
    "id": 45,
    "job": "제로",
    "skillName": "타임 어소리티",
    "src": "/images/blog/ver-1-2-417/048_%EC%8A%A4%ED%82%AC_101141506%5B%EC%A0%9C%EB%A1%9C(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> <strong class='text-amber-300 font-bold'>극딜</strong> <strong class='text-amber-300 font-bold'>버프 스킬</strong>입니다. 지속시간 동안 사출기가 <strong class='text-amber-300 font-bold'>21회</strong>까지 발동합니다.",
    "liveChange": "시간의 메아리 잔상 데미지 <strong class='text-amber-300 font-bold'>258%</strong> <strong class='text-amber-300 font-bold'>조정</strong>, 발동 가능 횟수 최대 <strong class='text-amber-300 font-bold'>15번</strong>으로 본섭 패치 적용되었습니다."
  },
  {
    "id": 46,
    "job": "키네시스",
    "skillName": "그래비티 오브젝트",
    "src": "/images/blog/new-6th-skills-2026/046_%ED%82%A4%EB%84%A4%EC%8B%9C%EC%8A%A4_%EA%B7%B8%EB%9E%98%EB%B9%84%ED%8B%B0%20%EC%98%A4%EB%B8%8C%EC%A0%9D%ED%8A%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>10초</strong> 쿨타임의 자동으로 발동하는 사출기입니다."
  },
  {
    "id": 47,
    "job": "아델",
    "skillName": "에레트 뤼페",
    "src": "/images/blog/ver-1-2-417/051_%EC%8A%A4%ED%82%AC_151141503%5B%EC%95%84%EB%8D%B8(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 키다운 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다.",
    "liveChange": "키다운 지속 공격 데미지 <strong class='text-amber-300 font-bold'>875%</strong> <strong class='text-amber-300 font-bold'>조정</strong>, 키다운 종료 후 에테르 소드 데미지 <strong class='text-amber-300 font-bold'>673%</strong>로 본섭 반영되었습니다."
  },
  {
    "id": 48,
    "job": "일리움",
    "skillName": "글로리 윙:스플렌더",
    "src": "/images/blog/new-6th-skills-2026/048_%EC%9D%BC%EB%A6%AC%EC%9B%80_%EA%B8%80%EB%A1%9C%EB%A6%AC%20%EC%9C%99_%EC%8A%A4%ED%94%8C%EB%A0%8C%EB%8D%94.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>120초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>극딜</strong> 스킬입니다. 글로리 윙 발동 시 발동합니다."
  },
  {
    "id": 49,
    "job": "칼리",
    "skillName": "헥스 : 듄 버스트",
    "src": "/images/blog/new-6th-skills-2026/049_%EC%B9%BC%EB%A6%AC_%ED%97%A5%EC%8A%A4%20_%20%EB%93%84%20%EB%B2%84%EC%8A%A4%ED%8A%B8.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  },
  {
    "id": 50,
    "job": "아크",
    "skillName": "원초의 격류",
    "src": "/images/blog/new-6th-skills-2026/050_%EC%95%84%ED%81%AC_%EC%9B%90%EC%B4%88%EC%9D%98%20%EA%B2%A9%EB%A5%98.png",
    "originalDesc": "직접 공격하면 격류 발생 격류가 <strong class='text-amber-300 font-bold'>2번</strong> 발생 하면 가시가 발동됩니다."
  },
  {
    "id": 51,
    "job": "렌",
    "skillName": "창룡파천검 : 만참",
    "src": "/images/blog/ver-1-2-417/053_%EC%8A%A4%ED%82%AC_161140507%5B%EB%A0%8C(6%EC%B0%A8)%5D_%EB%B3%80%EA%B2%BD.png",
    "originalDesc": "5차 스킬인 망혼검 절기 : 심검 발동 시 발동하는 스킬입니다. <strong class='text-amber-300 font-bold'>15초</strong>의 쿨타임이 있습니다.",
    "liveChange": "재발동 대기시간 <strong class='text-amber-300 font-bold'>5초</strong> <strong class='text-amber-300 font-bold'>단축</strong>, '망혼검 절기:열지/열지 VI 사용 시 준비, 심검 사용 시 발동' 조건이 본섭에서 명시되었습니다."
  },
  {
    "id": 53,
    "job": "라라",
    "skillName": "한아름 아우른 숨결",
    "src": "/images/blog/new-6th-skills-2026/053_%EB%9D%BC%EB%9D%BC_%ED%95%9C%EC%95%84%EB%A6%84%20%EC%95%84%EC%9A%B0%EB%A5%B8%20%EC%88%A8%EA%B2%B0.png",
    "originalDesc": "하이퍼 스킬 아름드리 나무 사용 후 분출 스킬을 사용하면 발동합니다. 분출 스킬이 발동중이 아니더라도 사용 가능합니다. 종료 후 분출 스킬이 발동됩니다."
  },
  {
    "id": 54,
    "job": "호영",
    "skillName": "선기 : 사흉해방 도철",
    "src": "/images/blog/new-6th-skills-2026/054_%ED%98%B8%EC%98%81_%EC%84%A0%EA%B8%B0%20_%20%EC%82%AC%ED%9D%89%ED%95%B4%EB%B0%A9%20%EB%8F%84%EC%B2%A0.png",
    "originalDesc": "<strong class='text-amber-300 font-bold'>60초</strong> 쿨타임 <strong class='text-amber-300 font-bold'>준극딜</strong> 스킬입니다."
  }
];

export default function New6thSkillsGuidePage() {
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
                        신규 6차 스킬 총정리
                    </span>
                </div>
            </div>

            {/* Article Container */}
            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Article Header */}
                <header className="mb-10 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full flex items-center gap-1">
                            🍁 메이플 업데이트 소식
                        </span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full">
                            HEXA 스킬 코어
                        </span>
                        <span className="text-slate-400 text-sm flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> 2026년 7월 23일
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                        메이플스토리 전 직업 신규 6차 스킬 (3rd HEXA) 완벽 정리
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                        패치노트부터 미리 보는 이벤트까지! 전 직업 신규 6차 스킬 코어 총 {skillList.length}종의 툴팁 원본 이미지, 기본 설명, 그리고 7월 23일 본섭 반영 변경사항을 완벽 정리했습니다.
                    </p>
                </header>

                {/* Main Skills Content List */}
                <section className="space-y-12 mb-16">
                    <div className="border-b border-slate-800 pb-4 flex items-center gap-3">
                        <Swords className="w-8 h-8 text-amber-400" />
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">직업별 신규 6차 스킬 툴팁 목록 ({skillList.length}종)</h2>
                            <p className="text-sm text-slate-400">모험가, 시그너스, 영웅, 레지스탕스, 노바, 제로, 아델 등 전 직업 신규 스킬 상세 분석</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {skillList.map((skill, idx) => (
                            <div key={idx} className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all p-6 shadow-xl">
                                <div>
                                    {/* Header info */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-amber-400 px-3 py-1 bg-amber-500/10 rounded-md border border-amber-500/20">
                                                [{skill.job}]
                                            </span>
                                            <span className="text-lg font-bold text-slate-100">{skill.skillName}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {skill.liveChange && (
                                                <span className="text-xs font-bold text-purple-300 px-2.5 py-1 bg-purple-500/20 rounded-md border border-purple-500/30">
                                                    (왼쪽 변경 전 / 오른쪽 변경 후)
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-400 flex items-center gap-1">
                                                <Maximize2 className="w-3.5 h-3.5" /> 원본 해상도
                                            </span>
                                        </div>
                                    </div>

                                    {/* Skill Image Box */}
                                    <div className="w-full bg-slate-950 rounded-xl overflow-x-auto border border-slate-800 p-4 flex justify-center mb-5 items-center">
                                        <img
                                            src={skill.src}
                                            alt={skill.skillName}
                                            className="max-w-none h-auto block rounded-md"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                                {/* Skill Description & Live Changes */}
                                <div className="space-y-3">
                                    {/* Original Description */}
                                    <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-4">
                                        <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                                            <CheckCircle2 className="w-4 h-4 text-amber-400" /> 스킬 설명
                                        </h4>
                                        <p className="text-sm text-slate-200 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: skill.originalDesc }} />
                                    </div>

                                    {/* Live Server Changes if applicable */}
                                    {skill.liveChange && (
                                        <div className="bg-purple-950/40 rounded-xl border border-purple-500/30 p-4">
                                            <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5 mb-1.5">
                                                <AlertCircle className="w-4 h-4 text-purple-400" /> [테섭 → 본섭 변경사항]
                                            </h4>
                                            <p className="text-sm text-purple-200 leading-relaxed font-semibold" dangerouslySetInnerHTML={{ __html: skill.liveChange }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer Link */}
                <footer className="mt-16 pt-8 border-t border-slate-800 text-center">
                    <p className="text-slate-400 text-sm mb-4">
                        더 자세한 메이플스토리 정보와 캐릭터 스펙 계산은 <strong>maple.ai.kr</strong>에서 확인하세요.
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
