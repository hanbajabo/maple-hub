# Google AdSense 광고 설정 가이드

> **작성일:** 2025-12-28  
> **승인일:** 2025-12-28  
> **목적:** maple.ai.kr에 AdSense 광고를 단계적으로 구현하기

---

## ✅ 승인 완료!

축하합니다! maple.ai.kr이 Google AdSense에 승인되었습니다.

**승인 정보:**
- **Publisher ID:** ca-pub-6144208174617294
- **승인일:** 2025년 12월 28일
- **사이트:** maple.ai.kr

---

## 📦 광고 컴포넌트 구조

### 생성된 컴포넌트

```
components/AdSense/
├── AdBanner.tsx        # 일반 배너 광고 (자동 반응형)
├── InFeedAd.tsx        # 인피드 광고 (블로그 목록용)
├── InArticleAd.tsx     # 인아티클 광고 (블로그 본문용)
└── index.ts            # Export 모음
```

### 컴포넌트 사용법

#### 1. AdBanner (일반 배너 광고)
```tsx
import { AdBanner } from '@/components/AdSense';

<AdBanner 
  dataAdSlot="YOUR_AD_SLOT_ID"
  dataAdFormat="auto"
  dataFullWidthResponsive={true}
  className="my-4"
/>
```

#### 2. InFeedAd (인피드 광고)
```tsx
import { InFeedAd } from '@/components/AdSense';

<InFeedAd 
  dataAdSlot="YOUR_INFEED_AD_SLOT_ID"
  className="my-8"
/>
```

#### 3. InArticleAd (인아티클 광고)
```tsx
import { InArticleAd } from '@/components/AdSense';

<InArticleAd 
  dataAdSlot="YOUR_INARTICLE_AD_SLOT_ID"
  className="my-8"
/>
```

---

## 🎯 광고 배치 전략

### 우선순위 1: 블로그 페이지
블로그는 체류 시간이 길고 콘텐츠가 풍부하여 광고 효과가 가장 좋습니다.

**배치 위치:**
1. **블로그 목록 페이지** (`/blog`)
   - 포스트 카드 사이사이에 InFeedAd 배치 (3개마다 1개)
   
2. **블로그 포스트 페이지** (`/blog/[slug]`)
   - 서론 후 첫 번째 InArticleAd
   - 본문 중간 InArticleAd
   - 포스트 하단 AdBanner

### 우선순위 2: 가이드 페이지
```
/guide/[slug] 페이지
- 가이드 상단 AdBanner
- 본문 중간 InArticleAd
- 가이드 하단 AdBanner
```

### 우선순위 3: 메인 페이지
```
/ (홈페이지)
- 헤더 아래 AdBanner (모바일만)
- Footer 위 AdBanner
```

### 우선순위 4: 캐릭터 검색 결과
```
검색 결과 페이지
- 결과 상단 AdBanner
- 결과 하단 AdBanner
```

---

## 🚀 단계별 구현 계획

### Phase 1: 블로그 광고 (최우선) ✅
- [ ] `/blog` 목록 페이지에 InFeedAd 추가
- [ ] `/blog/[slug]` 포스트 페이지에 InArticleAd 추가
- [ ] 광고 슬롯 ID 발급 및 적용

### Phase 2: 가이드 광고
- [ ] 가이드 페이지 템플릿에 광고 추가
- [ ] 모바일/데스크톱 반응형 테스트

### Phase 3: 메인 페이지 광고
- [ ] 메인 페이지 상단 광고 (모바일)
- [ ] Footer 광고

### Phase 4: 검색 결과 광고
- [ ] 캐릭터 검색 결과 페이지 광고

---

## 📋 AdSense 광고 단위 생성 체크리스트

Google AdSense 대시보드에서 다음 광고 단위를 생성해야 합니다:

### 필수 광고 단위

1. **디스플레이 광고 - 블로그 상단**
   - 이름: `maple-ai-blog-top-banner`
   - 유형: 디스플레이 광고
   - 크기: 반응형
   
2. **인피드 광고 - 블로그 목록**
   - 이름: `maple-ai-blog-infeed`
   - 유형: 인피드 광고
   - 레이아웃: 블로그 스타일에 맞게 커스터마이징

3. **인아티클 광고 - 블로그 본문**
   - 이름: `maple-ai-blog-inarticle`
   - 유형: 인아티클 광고
   - 자동 크기 조정

4. **디스플레이 광고 - 하단 배너**
   - 이름: `maple-ai-bottom-banner`
   - 유형: 디스플레이 광고
   - 크기: 반응형

---

## ⚠️ 주의사항

### Google AdSense 정책 준수

1. **클릭 유도 금지**
   - "광고를 클릭해주세요" 등의 문구 절대 금지
   - 현재 구현: 작은 "광고" 라벨만 표시 ✅

2. **광고 배치 제한**
   - 한 페이지에 광고가 너무 많으면 안 됨 (권장: 3-4개)
   - 콘텐츠보다 광고가 많으면 정책 위반

3. **콘텐츠 품질 유지**
   - 광고 수익을 위해 저품질 콘텐츠 게시 금지
   - 지속적인 고품질 콘텐츠 업데이트 필요

4. **자동 광고 vs 수동 광고**
   - 현재: 수동 광고 컴포넌트 생성 ✅
   - 자동 광고: layout.tsx에 이미 스크립트 추가됨
   - 권장: 수동 광고로 시작, 필요시 자동 광고 활성화

---

## 🧪 테스트 방법

### 개발 환경에서 테스트
```bash
npm run dev
```

**주의:** 개발 환경에서는 광고가 빈 공간으로 표시될 수 있습니다.

### 프로덕션 테스트
1. Vercel에 배포
2. 실제 도메인(maple.ai.kr)에서 확인
3. 광고가 표시되기까지 **최대 1시간** 소요 가능
4. Chrome DevTools 콘솔에서 에러 확인

### 광고 확인 사항
- ✅ 광고가 올바른 위치에 표시됨
- ✅ 모바일/데스크톱 반응형 작동
- ✅ 페이지 레이아웃 깨지지 않음
- ✅ 광고 로딩이 페이지 속도에 영향 없음

---

## 📊 성과 측정

### AdSense 대시보드 확인 항목
1. **RPM (페이지 수익률):** 1,000회 노출당 수익
2. **CTR (클릭률):** 광고 클릭 비율
3. **CPC (클릭당 비용):** 클릭 1회당 수익
4. **노출수:** 광고가 표시된 횟수

### 최적화 전략
- 광고 위치별 성과 분석
- 저성과 광고 위치 조정 또는 제거
- 고성과 광고 포맷 확대

---

## 🔄 다음 단계

1. **AdSense 대시보드에서 광고 단위 생성**
   - 4개의 광고 단위 ID 발급

2. **블로그 페이지에 광고 통합** (이번 작업)
   - `/blog` 페이지 수정
   - `/blog/[slug]` 템플릿 수정

3. **배포 및 테스트**
   - Vercel 배포
   - 실제 환경에서 광고 작동 확인

4. **성과 모니터링**
   - 1주일 후 AdSense 대시보드 확인
   - 광고 위치 최적화

---

## 📝 광고 슬롯 ID 관리

생성된 광고 단위의 슬롯 ID를 여기에 기록하세요:

```env
# .env.local에 추가 (선택사항)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-6144208174617294
NEXT_PUBLIC_ADSENSE_BLOG_TOP_BANNER=여기에_슬롯_ID
NEXT_PUBLIC_ADSENSE_BLOG_INFEED=여기에_슬롯_ID
NEXT_PUBLIC_ADSENSE_BLOG_INARTICLE=여기에_슬롯_ID
NEXT_PUBLIC_ADSENSE_BOTTOM_BANNER=여기에_슬롯_ID
```

또는 직접 컴포넌트에 하드코딩:
```tsx
<AdBanner dataAdSlot="1234567890" />
```

---

**작성자:** 단풍이 AI  
**상태:** 실행 준비 완료 ✅
