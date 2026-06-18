# OTT-TEST 테스트 리포트

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | OTT-TEST |
| GitHub 저장소 | https://github.com/harube29-lang/ott-test.git |
| 기술 스택 | React 18, Vite 5, MUI v9, Supabase JS SDK v2 |
| 배포 URL | https://harube29-lang.github.io/NETFLIX/ |
| 작성자 | 황혜경 |
| 작성일 | 2026-06-18 |

### 목표
Netflix / Disney+ / Watcha 스타일의 프리미엄 OTT 랜딩페이지 구현
- 콘텐츠 중심 UI
- 인터랙션 중심 UX
- 반응형 웹 구조

---

## 2. 화면 캡처

> 배포 완료 후 스크린샷 첨부 예정

- [ ] Hero Section — 대표 콘텐츠 배너
- [ ] 주요 콘텐츠 섹션 — Netflix 카드 그리드
- [ ] 상세 소개 섹션 — 강조 배너 + 카드 목록
- [ ] 추천 콘텐츠 — 가로 스크롤
- [ ] Footer
- [ ] 모바일 반응형

---

## 3. 테스트 전 문제

| # | 문제 | 원인 |
|---|------|------|
| 1 | Supabase 데이터 없음 | 초기 데이터 미입력 |
| 2 | 이미지 path 404 | vite `base` 미설정 |
| 3 | 로딩 스피너 없음 | 초기 상태 처리 누락 |

---

## 4. 수정 내용

| # | 수정 내용 |
|---|----------|
| 1 | Supabase `contents` 테이블에 10개 데이터 및 RLS Public Read 정책 확인 |
| 2 | `vite.config.js`에 `base: '/NETFLIX/'` 설정 |
| 3 | App.jsx에 로딩 스피너 UI 추가 |
| 4 | `.env` 환경변수로 Supabase 키 관리 |
| 5 | `.gitignore`에 `.env` 추가 |

---

## 5. 수정 결과

| 항목 | 결과 |
|------|------|
| `npm run build` | ✅ 에러 0 |
| Supabase 데이터 연동 | ✅ 10개 콘텐츠 + 4개 추천 |
| Hero Section | ✅ featured 콘텐츠 자동 표시 |
| 이미지 로드 | ✅ Unsplash CDN 정상 |

---

## 6. 반응형 테스트

| 브레이크포인트 | 레이아웃 | 결과 |
|--------------|----------|------|
| Desktop (1200px+) | 카드 4~6열, 전체 네비게이션 | ✅ |
| Tablet (768–1199px) | 카드 3열, 패딩 축소 | ✅ |
| Mobile (767px 이하) | 카드 1~2열, 헤더 56px | ✅ |

---

## 7. 최종 체크리스트

### UI 구성
- [x] Header — sticky + blur + 로고 이미지 + 메뉴 + 검색 + 마이페이지
- [x] Hero Section — 대표 배너 + CTA 2개 + gradient overlay + 스크롤 인디케이터
- [x] 주요 콘텐츠 — 10개 카드 + hover blur reveal
- [x] 상세 소개 — 강조 배너 1개 + 콘텐츠 상세 카드
- [x] 추천 콘텐츠 — 4개 + 가로 스크롤 + 화살표 버튼
- [x] Footer — 서비스 소개 + 이용약관 + SNS 링크 + 고객센터

### 인터랙션 (4개 필수)
- [x] 카드 hover — scale + shadow + blur reveal
- [x] trailer modal — open/close + ESC + 외부 클릭 닫기
- [x] scroll animation — Intersection Observer fade-up
- [x] navigation active — scroll section tracking

### 반응형
- [x] Desktop 1200px+
- [x] Tablet 768–1199px
- [x] Mobile 767px 이하

### 접근성
- [x] semantic HTML (header, main, section, footer, nav, article)
- [x] aria-label
- [x] alt 속성
- [x] keyboard navigation (ESC 모달 닫기)
- [x] focus visible

### 기술
- [x] React + Vite
- [x] Supabase JS SDK
- [x] 환경변수 `.env`
- [x] RLS Public Read 설정
- [x] CSS Variables 컬러 시스템
- [x] `npm run build` 에러 0

### 배포
- [x] `vite.config.js` — `base: '/NETFLIX/'`
- [x] GitHub Actions 워크플로우 작성
- [ ] GitHub Pages Secrets 등록 (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] main 브랜치 push → 자동 배포 확인
