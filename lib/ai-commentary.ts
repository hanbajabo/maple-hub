/**
 * AI 코멘터리 메인 파일 (모듈화 완료)
 * 
 * 기존 800+ 줄의 단일 파일을 다음과 같이 분리:
 * - ai-commentary/helpers.ts: 헬퍼 함수
 * - ai-commentary/item-classification.ts: 아이템 분류
 * - ai-commentary/starforce-analysis.ts: 스타포스 분석
 * - ai-commentary/flame-analysis.ts: 추가옵션 분석
 * - ai-commentary/potential-analysis.ts: 잠재능력 분석
 * - ai-commentary/additional-analysis.ts: 에디셔널 분석
 * - ai-commentary/index.ts: 메인 진입점
 */

export { generateItemCommentary } from './ai-commentary/index';
