# page.tsx 리팩토링 가이드

## 📋 현재 상태

### ✅ 완료된 작업
- `useCharacterSearch.ts` 생성 완료 (150줄)
- `useFavorites.ts` 생성 완료 (110줄)
- `useDiagnosis.ts` 생성 완료 (120줄)

### 🔄 다음 작업: page.tsx에 Hooks 적용

## 📖 적용 방법

### 1단계: Hooks Import 추가

```typescript
// page.tsx 상단에 추가
import { useCharacterSearch } from './hooks/useCharacterSearch';
import { useFavorites } from './hooks/useFavorites';
import { useDiagnosis } from './hooks/useDiagnosis';
```

### 2단계: 기존 State 교체

**기존 (137-159줄):**
```typescript
export default function Home() {
  const [nickname, setNickname] = useState("");
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [equipment, setEquipment] = useState<ItemData[]>([]);
  // ... (20개의 useState)
  const [favorites, setFavorites] = useState<Array<...>>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
```

**수정 후:**
```typescript
export default function Home() {
  // Hooks 사용
  const search = useCharacterSearch();
  const favorites = useFavorites();
  const diagnosis = useDiagnosis();
  
  // 남은 UI state만
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<ItemData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
```

### 3단계: 함수 호출 변경

**기존:**
```typescript
const handleSearch = async () => {
  // 200줄의 검색 로직
}

const addToFavorites = () => {
  // 즐겨찾기 추가 로직
}
```

**수정 후:**
```typescript
// search.handleSearch() 사용
// favorites.addFavorite() 사용
```

### 4단계: 진단 로직 통합

**기존:** handleSearch 안에 진단 로직이 포함되어 있음

**수정 후:**
```typescript
useEffect(() => {
  if (search.equipment && search.character && search.stats) {
    diagnosis.generateDiagnosis(
      search.equipment,
      search.character.character_class,
      search.stats
    );
  }
}, [search.equipment, search.character, search.stats]);
```

## ⚠️ 주의사항

1. **점진적 수정**: 한 번에 하지 말고 하나씩
2. **테스트**: 각 단계마다 로컬 서버로 테스트
3. **백업**: Git commit 자주 하기
4. **타입 에러**: TypeScript 에러 잘 확인

## 🎯 예상 결과

### Before
```
page.tsx: 2,075줄
- State 선언: 25줄
- Favorites 로직: 150줄
- Search 로직: 200줄
- Diagnosis 로직: 100줄
- UI 코드: 1,600줄
```

### After
```
page.tsx: ~300줄
- Hooks 사용: 10줄
- UI 코드: 290줄

app/hooks/
- useCharacterSearch.ts: 150줄
- useFavorites.ts: 110줄
- useDiagnosis.ts: 120줄
```

**총 감소: 85%** (2,075줄 → 300줄)

## 📝 체크리스트

- [ ] Hooks import 추가
- [ ] useCharacterSearch 적용
- [ ] useFavorites 적용
- [ ] useDiagnosis 적용
- [ ] 기존 handleSearch 제거
- [ ] 기존 favorites 로직 제거
- [ ] 로컬 테스트 (npm run dev)
- [ ] 빌드 테스트
- [ ] Git commit
- [ ] 배포

## 💡 팁

**안전한 작업 순서:**
1. 새 브랜치 생성: `git checkout -b refactor/apply-hooks`
2. 하나씩 적용하고 테스트
3. 문제 없으면 merge
4. 문제 있으면 rollback

**테스트 방법:**
```bash
npm run dev
# localhost:3000 에서 확인
# - 캐릭터 검색 작동?
# - 즐겨찾기 작동?
# - 진단 리포트 생성?
```
