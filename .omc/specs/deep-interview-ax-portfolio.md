# Deep Interview Spec: AX Engineer Portfolio Redesign

## Metadata
- Interview ID: ax-portfolio-2026-05-26
- Rounds: 10
- Final Ambiguity Score: 15.2%
- Type: brownfield
- Generated: 2026-05-26
- Threshold: 20%
- Status: PASSED

## Clarity Breakdown
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Goal Clarity | 0.90 | 35% | 0.315 |
| Constraint Clarity | 0.82 | 25% | 0.205 |
| Success Criteria | 0.80 | 25% | 0.200 |
| Context Clarity (brownfield) | 0.85 | 15% | 0.128 |
| **Total Clarity** | | | **0.848** |
| **Ambiguity** | | | **15.2%** |

---

## Goal
**Jaeuk Oh**의 AX(AI Agent Experience) 엔지니어 포트폴리오 페이지를 완전히 개편한다.  
핵심 목표: 스타트업/중소기업 AI팀 채용담당자가 사이트에 접속했을 때 **"이 사람은 AI 에이전트를 실제로 만들어본 엔지니어다"** 라는 신뢰감을 즉각 느낄 수 있어야 한다.

---

## Constraints

### 기술 제약
- **기존 스택 유지:** React 19 + Vite (재구성은 하되 마이그레이션 없음)
- **기존 파일:** `src/App.jsx`, `src/App.css`, `src/index.css` 대폭 수정
- **빌드 타겟:** `docs/` 디렉터리 (GitHub Pages, CNAME 있음)

### 디자인 방향
- **스타일:** 크리에이티브 / 애니메이션 관령 — 그라디언트, 커스텀 이펙트, 스크롤 인터랙션
- **언어:** 영어 전도 (한국어 없음)
- **이름/직함:** `Jaeuk Oh` / `AX Engineer` 또는 `AI Agent Engineer`
- **테마:** 다크 계열 유지 가능, 단 기존 단조로운 #2c3e50 에서 벗어남

### 페이지 구조 (3섹션)
```
1. Hero Section
   ├── 정체성: Jaeuk Oh, AX Engineer
   ├── 한 줄 포지셔닝 문구
   └── Project Highlights (인라인 — 2~3개 대표 프로젝트 카드/링크)
       ├── GitHub 링크
       └── Live Demo 링크

2. Skills / Tech Stack Section
   ├── AI/LLM: Claude API, LangChain/LangGraph, RAG, Tool Use 등
   └── Engineering: Python, React, etc.

3. Contact / CTA Section
   ├── 채용담당자 CTA ("Let's Build Together" 등)
   └── 이메일, GitHub 링크
```

### Non-Goals
- 블로그/포스트 기능 없음
- 별도 프로젝트 상세 페이지 없음 (링크로만 연결)
- 라우팅 라이브러리 추가 없음 (단일 페이지)
- 다국어 지원 없음

---

## AX Junior Engineer KPIs (조사 기반 — 채용담당자가 체크하는 항목)

| KPI 영역 | 포트폴리오에서 보여주는 방식 |
|---------|--------------------------|
| **Agent Breadth** | 다양한 도메인에 걸친 에이전트 프로젝트 (2~3개) |
| **LLM Integration Depth** | Claude API / OpenAI, Tool Use, Multi-agent 기술스택 명시 |
| **Shipped Quality** | 라이브 데모 URL — 실제 작동하는 것 |
| **Technical Clarity** | 각 프로젝트 한 줄 설명: 문제 → 해결 → 사용 기술 |
| **Iteration Speed** | 지속적으로 만드는 사람이라는 인상 |

---

## Acceptance Criteria

- [ ] 채용담당자가 5초 내에 "AI 에이전트 엔지니어"임을 인식할 수 있다
- [ ] 히어로 섹션에 GitHub 링크와 Live Demo 링크가 각각 최소 1개 이상 존재한다
- [ ] 스킬 섹션에 AI/LLM 관련 기술 (Claude API, RAG 등) 이 명시된다
- [ ] 컨택트 CTA가 명확하고 이메일 또는 GitHub로 연결된다
- [ ] 모바일 반응형 (480px, 768px 브레이크포인트)
- [ ] `npm run build` 성공 후 `docs/` 에 배포 가능 상태
- [ ] 애니메이션/트랜지션이 있어 "크리에이티브 포트폴리오" 인상을 준다
- [ ] 영어 전도 — 한국어 UI 텍스트 없음

---

## Technical Context (Brownfield)

### 기존 코드베이스 현황
- **프레임워크:** React 19.0.0 + Vite 6.3.1
- **스타일링:** 순수 CSS (App.css, index.css) — 3rd-party 없음
- **현재 컴포넌트:** `App.jsx` 단일 컴포넌트, 모든 로직 인라인
- **현재 기능:**
  - 타이핑 애니메이션 (useState + setTimeout 기반)
  - 스크롤 페이지 내비게이션 (비활성화 상태: `canScroll = false`)
  - 고정 푸터 (`position: fixed`)
  - 다크 테마 (#2c3e50 배경)
- **빌드 설정:** `vite.config.js` — `base: "/"`, `outDir: "docs"`
- **배포:** GitHub Pages (CNAME 파일 있음)

### 변경 전략
- `App.jsx` → 3섹션 컴포넌트로 재구성 (또는 분리)
- `App.css` → 전면 재작성
- 기존 타이핑 애니메이션 패턴 재활용 가능 (히어로 텍스트에)
- `canScroll` 로직 제거 또는 스무스 스크롤로 대체
- 푸터 → 컨택트 섹션으로 통합

---

## Ontology (Key Entities)

| Entity | Type | Fields | Relationships |
|--------|------|--------|---------------|
| Jaeuk Oh | core domain | name, title (AX Engineer), email, github | owns Portfolio |
| Portfolio | core domain | sections, language (EN), style (creative) | contains Hero, Skills, Contact |
| Hero | supporting | headline, tagline, projects[] | contains ProjectCard |
| ProjectCard | supporting | name, description, github_url, demo_url, tech[] | belongs to Hero |
| Skills | supporting | ai_skills[], eng_skills[] | belongs to Portfolio |
| Contact | supporting | email, github, cta_text | belongs to Portfolio |
| HiringManager | external system | — | views Portfolio |

---

## Ontology Convergence

| Round | Key Entities | Stability |
|-------|-------------|-----------|
| 1 | AI Agent Engineer | N/A |
| 3 | AI Agent Engineer, Startup HM, Multi-project | 67% |
| 5 | AI Agent Engineer, HM, Multi-project, Creative Portfolio | 75% |
| 7 | Hero, Skills, Contact, AI Agent Engineer | 82% |
| 9 | Hero(+Projects), Skills, Contact, Jaeuk Oh | 90% |
| 10 | Jaeuk Oh, Portfolio, Hero, ProjectCard, Skills, Contact, HiringManager | **95%** |

---

## Interview Transcript

<details>
<summary>Full Q&A (10 rounds)</summary>

### Round 1
**Q:** AX 엔지니어가 정확히 어떤 역할인지?
**A:** AI Agent 설계/개발자
**Ambiguity:** ~78%

### Round 2
**Q:** 포트폴리오의 주요 목적과 독자?
**A:** 취업 지원 (스타트업/중소기업 AI 팀)
**Ambiguity:** ~66%

### Round 3
**Q:** 주로 어떤 유형의 작업물을 강조?
**A:** 여러 프로젝트를 보여주는데, AX 신입 엔지니어 KPI 맞게 보여주고 싶다
**Ambiguity:** ~61%

### Round 4 (Contrarian Mode)
**Q:** KPI 프레임의 핵심 이유가 따로 있나?
**A:** 뭐가 중요한지는 니가 알아와야지 → KPI 조사는 Claude가 담당
**Ambiguity:** ~57%

### Round 5
**Q:** 시각적 스타일 방향?
**A:** 더 화려한/애니메이션 관령 (크리에이티브 포트폴)
**Ambiguity:** ~49%

### Round 6 (Simplifier Mode)
**Q:** 포트폴리오에 들어가야 할 섹션?
**A:** 히어로, 스킬/테크스택, 컨택트/CTA
**Ambiguity:** ~41%

### Round 7
**Q:** 프로젝트 섹션을 선택하지 않았는데?
**A:** 히어로 내에 프로젝트 하이라이트 포함
**Ambiguity:** ~35%

### Round 8
**Q:** 컨텐츠 언어와 이름/타이틀?
**A:** 영어 전도 (Jaeuk Oh, AX Engineer)
**Ambiguity:** ~30%

### Round 9
**Q:** 채용담당자가 즉각 느꼈으면 하는 것?
**A:** "AI 에이전트를 실제로 만들어봤네" 신뢰성
**Ambiguity:** ~22%

### Round 10
**Q:** 신뢰성 증거로 가진 것?
**A:** GitHub 레포 (공개), 배포된 라이브 데모/서비스
**Ambiguity:** **15.2%** ✅

</details>
