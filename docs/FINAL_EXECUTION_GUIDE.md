# 🚀 최종 실행 가이드 - 다크 모드 디자인 기반

**상황**: Stitch 다크 모드 5개 페이지 시안 완성 + 문서 16개 완성

---

## 📖 **읽기 순서** (50분)

### Step 1️⃣: 디자인 이해 (20분)
```
1. DESIGN_SUMMARY.md (15분)
   - 전체 디자인 개요
   - 색상, 폰트, 레이아웃

2. DARK_MODE_IMPLEMENTATION.md (5분) ⭐ NEW
   - 다크 모드 특화 설정
   - 실제 스크린샷 기반 색상
```

### Step 2️⃣: 구현 전략 (15분)
```
1. DESIGN_TO_CODE_GUIDE.md (10분)
   - 3시간 로드맵
   - Phase 1-8 구성

2. COMPONENT_BREAKDOWN.md (5분)
   - 컴포넌트 계층도
   - 우선순위
```

### Step 3️⃣: 기술 준비 (15분)
```
1. DESIGN_SYSTEM_IMPLEMENTATION.md (10분)
   - Tailwind 설정
   - 폰트 로드

2. CLAUDE_CODE_PROMPTS.md (5분) ⭐ 실행 준비
   - Phase 1~8 프롬프트 미리 보기
```

---

## 💻 **3시간 구현 로드맵**

### **Phase 1** (15분): 색상 + 폰트 + 다크 모드
```
📝 프롬프트:
"DESIGN_SYSTEM_IMPLEMENTATION.md의 색상값과
DARK_MODE_IMPLEMENTATION.md의 다크 모드 설정을 
Tailwind에 적용해줄래?"

포함사항:
- tailwind.config.ts (라이트/다크 모드)
- styles/typography.css (Syne, JetBrains Mono)
- lib/constants.ts (레이아웃 값)
```

### **Phase 2-3** (25분): Header + ThemeToggle
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 2, 3 프롬프트 사용"

추가 사항:
- 다크 모드에서도 테스트
- 🌙/☀️ 아이콘 명확히
- localStorage 저장
```

### **Phase 4** (15분): Card + Badge
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 4 프롬프트"

다크 모드 대비 확인:
- 배경 #1C1B1B에서 가독성
- 테두리 #3A3939 표시
```

### **Phase 5** (20분): MyRecorder 카드
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 5 프롬프트"

실제 시안 반영:
- 01: Mint, 02: Peach, 03: Sky, 04: Purple
- Hover: 배경 심화 + 스케일 1.02
- 화살표 애니메이션
```

### **Phase 6** (20분): Timeline + Experience
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 6 프롬프트"

실제 스크린샷 반영:
- 2px 수직 선 (#3A3939 다크 모드)
- 원형 마커 12px
- 날짜 | 직책 | 설명 레이아웃
```

### **Phase 7** (30분): Posts + 필터
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 7 프롬프트"

실제 스크린샷 반영:
- 필터 탭: All, Troubleshooting, Retrospective, Study
- 카드: 썸네일 + 제목 + 날짜 + 태그
- 다크 배경에 테두리 카드
```

### **Phase 8** (25분): Resume + 그리드 배경
```
📝 프롬프트:
"CLAUDE_CODE_PROMPTS.md의 Phase 8 프롬프트"

실제 스크린샷 반영:
- 그리드 패턴 배경 (#3A3939 라인)
- 큰 "RESUME" 텍스트 (Syne Bold)
- 두 개 버튼: "이력서 보기" + "PDF 다운로드"
- 하단 라벨: "SYS.READY // DOC.AVAILABLE"
```

---

## 🎨 **다크 모드 구현 팁**

### Tailwind 클래스
```typescript
// 라이트/다크 자동 전환
className="bg-light-surface dark:bg-dark-surface"
className="text-light-text dark:text-dark-text"
className="border-light-border dark:border-dark-border"

// 다크 모드 포커스 (흰색)
className="dark:focus-visible:outline-white"

// 조건부 배경 (파스텔은 항상 동일)
className={activeTab === 'about' ? 'bg-mint' : 'bg-light-surface-dim dark:bg-dark-surface-dim'}
```

### 다크 모드 활성화 (HTML)
```html
<!-- dark 클래스가 html에 있으면 다크 모드 -->
<html class="dark">

<!-- localStorage에 저장되어 새로고침해도 유지 -->
```

### 테스트 방법
```bash
# 라이트 모드 개발
bun run dev
# 브라우저 F12 → 🌙/☀️ 토글 클릭

# 또는 DevTools에서 직접 테스트
# DevTools → Settings → Rendering → Emulate CSS media feature prefers-color-scheme
```

---

## ✅ **최종 체크리스트** (2시간)

### 구현 중
- [ ] Phase 1: 색상/폰트 설정
- [ ] Phase 2-3: Header + Toggle
- [ ] Phase 4: Card + Badge
- [ ] Phase 5: MyRecorder
- [ ] Phase 6: Timeline
- [ ] Phase 7: Posts
- [ ] Phase 8: Resume
- [ ] 각 Phase마다 `git commit`

### 라이트 모드 적용 (30분)
- [ ] DESIGN_SYSTEM_IMPLEMENTATION.md의 라이트 컬러 적용
- [ ] 각 컴포넌트에서 라이트 모드 클래스 추가
- [ ] `dark:` 프리픽스로 다크 모드 스타일 정의

### 최종 검증 (30분)
```
라이트 모드:
- [ ] 모든 텍스트 #1A1A1A on #FFFFFF (대비 21:1)
- [ ] 액센트 #0066CC 명확히 표시
- [ ] 호버/포커스 상태 정확함

다크 모드:
- [ ] 모든 텍스트 #FFFFFF on #141313 (대비 19.4:1)
- [ ] 액센트 #FFFFFF 명확히 표시
- [ ] 호버/포커스 상태 정확함

공통:
- [ ] 모든 요소 Tab으로 접근 가능
- [ ] Lighthouse 90+ (라이트/다크 각각)
- [ ] 모바일 반응형 (라이트/다크)
- [ ] 모든 폰트 로드됨
```

---

## 📊 **시간 분배**

| 단계 | 시간 | 작업 |
|------|------|------|
| 가이드 읽기 | 50분 | 이해 |
| Phase 1 | 15분 | 색상/폰트/다크모드 |
| Phase 2-3 | 25분 | Header/Toggle |
| Phase 4 | 15분 | Card/Badge |
| Phase 5 | 20분 | MyRecorder |
| Phase 6 | 20분 | Timeline |
| Phase 7 | 30분 | Posts |
| Phase 8 | 25분 | Resume |
| **구현 소계** | **150분** | |
| 라이트 모드 | 30분 | 추가 스타일 |
| 검증 | 30분 | 테스트 |
| **총** | **290분 (약 5시간)** | |

---

## 🎯 **다크 모드 기반 실행 흐름**

```
Step 1: 문서 읽기 (50분)
  ↓
Step 2: Phase 1 실행 (다크 모드 포함)
  ↓
Step 3: Phase 2-8 순서대로 실행 (2시간 40분)
  각 Phase마다:
    1. Claude Code로 구현
    2. 다크 모드 확인
    3. git commit (수동)
  ↓
Step 4: 라이트 모드 추가 (30분)
  각 컴포넌트에 라이트 모드 스타일 추가
  ↓
Step 5: 최종 검증 (30분)
  라이트/다크 모드 모두 테스트
  Lighthouse 점수 확인
  
결과: 완성된 포트폴리오 🎉
  - ✅ 다크 모드 완벽 구현
  - ✅ 라이트 모드 동시 지원
  - ✅ WCAG AA 접근성
  - ✅ Lighthouse 90+
```

---

## 🚀 **지금 시작하세요!**

### 준비물
```
✅ 16개 문서 (모두 다운로드)
✅ 5개 다크 모드 스크린샷 (이미지)
✅ Claude Code 준비
✅ Tailwind 최신 버전
```

### 실행 순서
```
1. DESIGN_SUMMARY.md 읽기 (15분)
2. DARK_MODE_IMPLEMENTATION.md 읽기 (5분) ⭐
3. DESIGN_TO_CODE_GUIDE.md 읽기 (20분)
4. CLAUDE_CODE_PROMPTS.md Phase 1 프롬프트 복사
5. Claude Code 실행!
```

---

## 📝 **Claude Code 프롬프트 템플릿**

```
"DESIGN_SYSTEM_IMPLEMENTATION.md와 
DARK_MODE_IMPLEMENTATION.md를 기반으로
CLAUDE_CODE_PROMPTS.md의 Phase [N] 프롬프트를 실행해줄래?"

또는

"docs/CODING_CONVENTIONS.md와 
docs/SEMANTIC_HTML_A11Y.md를 준수하면서
DARK_MODE_IMPLEMENTATION.md의 다크 모드 색상을 사용해서
[컴포넌트]를 만들어줄래?"
```

---

## ✨ **완성 후**

```
✅ 완전한 다크 모드 포트폴리오
✅ 라이트 모드 토글 가능
✅ WCAG 2.1 AA 준수
✅ Lighthouse 90+ 점수
✅ 모바일 완벽 반응형
✅ 모든 인터랙션 작동
✅ 접근성 완벽 구현

🚀 배포 준비 완료!
```

---

**이제 시작하세요!** 🌟

50분 + 3시간 = **약 4시간 안에 완성된 포트폴리오!**
