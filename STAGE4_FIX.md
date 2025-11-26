# Stage 4 수정 계획

## 목표
1. 도전자 아이템은 5단계 모든 체크 스킵 (올패스)
2. 글로리온 링은 주문서 작 체크 예외 (이벤트링이라 주문서 불가)

## 수정 위치
- 파일: components/BossDiagnosis/stages/stage4.ts
- forEach 루프 내부 (35줄부터 시작)

## 수정 방법
1. 변수 선언 후 바로 도전자 체크 추가
2. 도전자면 모든 stat의 total과 current를 증가시키고 return
3. 글로리온 링은 주문서 체크에서 isSpecialRing 조건에 추가
