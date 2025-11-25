# 구글 애드센스 설정 가이드

## 📍 광고 배치 위치

### 1. 메이플 뉴스 하단 (News Bottom)
- **위치**: 검색 전 메인 페이지, 뉴스 섹션 바로 아래
- **권장 크기**: 728x90 (Leaderboard) 또는 Responsive
- **효과**: 높음 - 사용자가 가장 먼저 보는 영역

### 2. 페이지 하단 (Page Footer)
- **위치**: Footer 바로 위
- **권장 크기**: 728x90 (Leaderboard) 또는 Responsive
- **효과**: 중간 - 모든 콘텐츠 확인 후 자연스러운 위치

---

## 🔧 애드센스 승인 후 설정 방법

### Step 1: 애드센스 게시자 ID 받기
1. 구글 애드센스 승인 후 발급받은 **게시자 ID** 확인
   - 형식: `ca-pub-XXXXXXXXXXXXXXXX`

### Step 2: layout.tsx 수정
`app/layout.tsx` 파일의 17번째 줄에서:
```tsx
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
```
→ `XXXXXXXXXXXXXXXX`를 실제 게시자 ID로 교체

### Step 3: 광고 단위 생성
애드센스 대시보드에서 광고 단위 생성:
1. **뉴스 하단 광고**: 디스플레이 광고 → 반응형 또는 728x90
2. **페이지 하단 광고**: 디스플레이 광고 → 반응형 또는 728x90

각 광고 단위에서 **광고 슬롯 ID** 받기

### Step 4: AdBanner.tsx에서 사용
`components/AdBanner.tsx` 파일의 `AdSlots` 객체에 슬롯 ID 입력:
```tsx
export const AdSlots = {
  NEWS_BOTTOM: '1234567890', // ← 실제 슬롯 ID로 교체
  PAGE_FOOTER: '1234567892', // ← 실제 슬롯 ID로 교체
};
```

### Step 5: page.tsx에서 Placeholder 교체
현재 placeholder로 되어 있는 광고 영역을 실제 `AdBanner` 컴포넌트로 교체:

**뉴스 하단 (page.tsx 618줄 근처)**
```tsx
// 현재:
<div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4...">
  <div className="text-center">
    <div className="text-xs text-slate-500 mb-2">Advertisement</div>
    <div className="text-slate-600 text-sm">광고 영역 (728x90 or Responsive)</div>
  </div>
</div>

// 교체:
import AdBanner, { AdSlots } from '@/components/AdBanner';
<AdBanner adSlot={AdSlots.NEWS_BOTTOM} adFormat="auto" />
```

**페이지 하단 (page.tsx 1358줄 근처)**
```tsx
// 교체:
<AdBanner adSlot={AdSlots.PAGE_FOOTER} adFormat="auto" />
```

---

## ✅ 체크리스트

- [ ] 애드센스 승인 완료
- [ ] 게시자 ID 받음 (`ca-pub-...`)
- [ ] `layout.tsx`에 게시자 ID 입력
- [ ] 애드센스에서 광고 단위 2개 생성
- [ ] 광고 슬롯 ID 2개 받음
- [ ] `AdBanner.tsx`에 슬롯 ID 입력
- [ ] `page.tsx` import 추가
- [ ] Placeholder를 `AdBanner` 컴포넌트로 교체
- [ ] 배포 후 광고 표시 확인

---

## 📊 광고 성과 최적화 팁

1. **광고 위치는 추가하지 말 것**
   - 현재 2곳이 최적 (너무 많으면 사용자 경험 저하)

2. **반응형 광고 권장**
   - 모바일/데스크톱 모두 대응

3. **광고 차단 감지 (선택사항)**
   - 광고 차단 사용자에게 안내 메시지 표시 가능

4. **성과 모니터링**
   - 애드센스 대시보드에서 정기적으로 확인
   - CTR, RPM 등 지표 분석

---

## 🚨 주의사항

- ❌ 자신의 광고를 클릭하지 마세요 (정책 위반)
- ❌ 클릭 유도 문구 사용 금지
- ✅ 광고와 콘텐츠는 명확히 구분
- ✅ "Advertisement" 라벨은 필수

**광고 승인 전까지는 Placeholder가 표시됩니다!**
