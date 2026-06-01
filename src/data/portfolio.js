/** @type {Profile} */
export const profile = {
  name: "Jaeuk Oh",
  title: "AX Engineer",
  subtitle: "AI Agent Engineer",
  tagline: "I build AI agents that ship.",
  bio: "헬스케어, 교육, 커머스 도메인에서 AI 에이전트를 설계하고 실제 서비스로 배포합니다 — Claude, RAG, 멀티 에이전트 파이프라인 기반.",
};

/** @type {Project[]} */
export const projects = [
  {
    id: "product-review-agent",
    name: "Product Review Agent",
    tagline: "Multi-perspective product analysis, automated.",
    why: "상품 리뷰 수천 개를 수동으로 읽고 분류하는 작업이 반복되는 걸 보고, 에이전트가 이 흐름 전체를 자율적으로 처리할 수 있는지 검증하고 싶었습니다.",
    problem: "리뷰 수집부터 분류, 요약, 인사이트 도출까지 모두 수동 작업으로 진행되어 확장이 불가능했습니다.",
    solution: "멀티 에이전트 파이프라인으로 리뷰 크롤링 → 감성 분류 → 요약 → 보고서 생성을 자동화했습니다.",
    flow: ["리뷰 URL 입력", "크롤링 에이전트", "감성 분류", "LLM 요약", "보고서 생성"],
    stack: ["OpenAI API", "Python", "Multi-Agent", "Tool Use"],
    competencies: [
      { label: "멀티 에이전트 설계", detail: "수집/분류/요약 에이전트를 역할 분리하여 병렬 처리" },
      { label: "Tool Use 설계", detail: "검색·파싱 도구를 에이전트에 바인딩해 자율 실행 흐름 구성" },
      { label: "출력 검증 설계", detail: "구조화된 출력 스키마로 후처리 없이 바로 사용 가능한 결과 생성" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/Product-Review-Agent",
    demoUrl: "",
  },
  {
    id: "repo-qna-bot",
    name: "Repo Q&A Bot",
    tagline: "Slack에서 코드베이스에 바로 질문하는 사내 봇.",
    why: "새 레포 온보딩 시 수백 개 파일을 직접 읽어야 하는 비효율을 없애고, RAG가 코드베이스에서도 작동하는지 실증하고 싶었습니다.",
    problem: "코드 관련 질문은 패턴/참조 기반 구조화 답변이, 일반 질문은 자연어 답변이 필요한데 하나의 프롬프트로 처리하면 품질이 저하됩니다.",
    solution: "3단계 인텐트 분류(코드/프로젝트/일반)로 질문을 먼저 구분하고, 레포를 청크 단위로 인덱싱해 ChromaDB에서 시맨틱 검색 후 GPT-4o-mini가 소스 인용과 함께 답변합니다.",
    flow: ["Slack 메시지 수신", "인텐트 3단계 분류", "ChromaDB 시맨틱 검색", "GPT-4o-mini 답변 생성", "Slack 응답 전송"],
    stack: ["OpenAI GPT-4o-mini", "ChromaDB", "RAG", "Slack API", "Python"],
    competencies: [
      { label: "인텐트 분류 설계", detail: "질문 유형별 최적 응답 전략을 분기하는 3-tier 분류 체계 구현" },
      { label: "RAG 파이프라인 설계", detail: "코드 파일 특성에 맞는 청킹/임베딩 전략 및 자동 재인덱싱 설계" },
      { label: "멀티 레포 아키텍처", detail: "config 1줄 추가로 레포별 독립 봇 인스턴스·벡터 DB를 운영하는 확장 구조" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/REPO_QNA_BOT",
    demoUrl: "",
  },
  {
    id: "healthcare-counseling",
    name: "보건소 의료비 지원 상담 AI",
    tagline: "전화 상담 중 실시간으로 정책 정보를 제공하는 RAG 플랫폼.",
    why: "보건소 상담사들이 전화 받는 동안 정책 문서를 직접 검색하는 병목을 AI로 해소하고, 도메인 지식이 촘촘한 환경에서 RAG 설계를 어떻게 최적화하는지 실험하고 싶었습니다.",
    problem: "의료비 지원 정책은 문서가 작지만 내부 기준이 복잡하게 겹칩니다. 청킹 시 소득 기준(A절)과 신청 방법(C절)이 분리되어 LLM이 복합 조건을 잘못 판단합니다.",
    solution: "정책 파일 전체를 단일 벡터로 저장하고 top_k = 문서 수로 설정해 LLM이 동시에 전체 정책을 비교하도록 설계. AI가 시민 역할을 맡아 먼저 말을 거는 역전된 UX로 상담사 학습 부담을 없앴습니다.",
    flow: ["AI가 시민 역할로 증상 제시", "전체 정책 문서 동시 검색", "Function Calling으로 인용 생성", "GPT-4o 지원 가능 여부 판단", "인근 병원 자동 추천"],
    stack: ["OpenAI GPT-4o", "FastAPI", "ChromaDB", "Next.js", "Naver Maps API"],
    competencies: [
      { label: "전문 도메인 RAG 설계", detail: "청킹 대신 전문 저장 방식으로 복합 정책 조건 판단 정확도 향상" },
      { label: "Function Calling 설계", detail: "LLM 응답을 구조화된 스키마로 제약해 실제 조문 번호만 인용하도록 강제" },
      { label: "역할 반전 UX 설계", detail: "AI가 시민 역할을 먼저 시작해 실전 전화 환경을 재현, 별도 교육 불필요" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/healthcare_counseling",
    demoUrl: "",
  },
  {
    id: "leadership-training",
    name: "Leadership Training Service",
    tagline: "AI-powered leadership coaching with feedback loops.",
    why: "단순 정보 전달을 넘어 AI가 실제로 코칭과 평가를 반복할 수 있는지, 즉 에이전트가 교육자 역할을 할 수 있는지 검증하고 싶었습니다.",
    problem: "리더십 교육은 맞춤형 피드백이 핵심인데, 강사 의존도가 높아 확장이 어렵습니다.",
    solution: "시나리오 기반 문제 제시 → 수강생 응답 분석 → 개인화 피드백 생성의 반복 루프를 에이전트로 구현했습니다.",
    flow: ["시나리오 생성", "수강생 응답", "응답 분석", "피드백 생성", "다음 시나리오 제시"],
    stack: ["Claude API", "Python", "LangChain", "Prompt Engineering"],
    competencies: [
      { label: "평가 루프 설계", detail: "응답 품질 평가 후 피드백을 자동 생성하는 Self-reflective 에이전트 구현" },
      { label: "개인화 설계", detail: "수강생별 응답 패턴을 추적해 개인화된 코칭 경로 생성" },
      { label: "구조화 출력 설계", detail: "교육 목표에 맞는 시나리오와 루브릭을 구조화된 형태로 출력" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/Leadership-Training-Service",
    demoUrl: "",
  },
  {
    id: "english-exam-maker",
    name: "영어 변형문제 제작기",
    tagline: "수능/내신 영어 변형문제를 초 단위로 생성, HWP로 바로 출력.",
    why: "반복적인 문제 제작 업무를 자동화하면서, 교육 도메인 제약 조건(출제 금지 규칙, 정답 패턴 다양성)을 LLM에 어떻게 강제할 수 있는지 실험하고 싶었습니다.",
    problem: "수능·내신 변형문제는 유형별 출제 규칙이 엄격하고 HWP 형식이 필수인데, 교사가 이 모든 과정을 수작업으로 처리합니다.",
    solution: "원문(텍스트/PDF/이미지)을 입력하면 GPT-4o가 5종 유형 규칙에 따라 변형문제를 생성하고, 출제 금지 조건 자동 판별 및 정답 패턴 분산 후 HWPX 파일로 내보냅니다.",
    flow: ["원문 입력 (텍스트/PDF/이미지)", "유형 선택 (5종)", "GPT-4o 문제 생성", "출제 금지 조건 검사", "HWPX 파일 출력"],
    stack: ["OpenAI GPT-4o", "FastAPI", "Next.js", "SQLite", "Vision API"],
    competencies: [
      { label: "도메인 제약 주입 설계", detail: "출제 금지 조건(예시 문장 빈칸, 단서 없는 빈칸 등)을 프롬프트에 명시적으로 인코딩" },
      { label: "구조화 출력 설계", detail: "유형별 JSON 스키마로 일관된 출력 보장, DB에 원본 보존해 빈칸은 출력 단계에서만 적용" },
      { label: "출력 품질 제어 설계", detail: "정답 번호 패턴 다양성을 세션 단위로 추적해 동일 번호 연속 방지" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/English-Exam-Maker",
    demoUrl: "",
  },
  {
    id: "cyphers-llm",
    name: "Cyphers LLM",
    tagline: "Game-aware LLM agent for Cyphers strategy.",
    why: "게임이라는 복잡한 도메인 지식을 LLM에게 어떻게 효과적으로 주입하고, 실시간 상황에 맞는 조언을 생성할 수 있는지 탐구하고 싶었습니다.",
    problem: "게임 특화 지식(캐릭터 스탯, 메타, 시너지)이 일반 LLM에 없어 의미 있는 전략 조언이 불가능합니다.",
    solution: "게임 데이터를 구조화해 지식 베이스로 구축하고, 상황별 전략 조언을 생성하는 도메인 특화 에이전트를 개발했습니다.",
    flow: ["게임 상황 입력", "지식 베이스 검색", "시너지 분석", "Claude 전략 생성", "조언 출력"],
    stack: ["Claude API", "Python", "RAG", "Tool Use"],
    competencies: [
      { label: "도메인 지식 주입 설계", detail: "게임 메타 데이터를 구조화해 LLM이 활용 가능한 지식 베이스로 변환" },
      { label: "상황 추론 설계", detail: "현재 게임 상황을 입력으로 받아 최적 전략을 추론하는 에이전트 설계" },
      { label: "저지연 응답 설계", detail: "실시간 게임 환경에 맞는 빠른 응답을 위한 프롬프트 최적화" },
    ],
    githubUrl: "https://github.com/jaeuk-oh/cyphers_llm",
    demoUrl: "",
  },
];

/** @type {Capability[]} */
export const capabilities = [
  {
    id: "agent-design",
    title: "AI Agent 설계",
    description: "단순 LLM 호출이 아닌, 자율적으로 계획하고 실행하는 에이전트 파이프라인을 설계합니다.",
    tags: ["Multi-Agent", "Tool Use", "LangGraph", "Claude API"],
  },
  {
    id: "rag-retrieval",
    title: "RAG & 검색 시스템",
    description: "도메인 지식을 LLM이 정확하게 활용할 수 있도록 구조화하고, hallucination을 억제합니다.",
    tags: ["RAG", "Vector DBs", "Hybrid Search", "Embedding"],
  },
  {
    id: "output-control",
    title: "LLM 출력 제어",
    description: "프롬프트 아키텍처와 Function Calling으로 원하는 형식의 신뢰할 수 있는 결과를 강제합니다.",
    tags: ["Prompt Engineering", "Function Calling", "MCP", "Schema Design"],
  },
  {
    id: "service-engineering",
    title: "AI 서비스 엔지니어링",
    description: "에이전트를 실제로 배포 가능한 서비스로 연결합니다. 프로토타입이 아닌 작동하는 제품.",
    tags: ["FastAPI", "React", "Python", "Docker"],
  },
];

/** @type {Contact} */
export const contact = {
  email: "tony66@whatonsolve.com",
  github: "https://github.com/jaeuk-oh",
  kakao: "https://open.kakao.com/o/sdMx0Cxi",
  linkedin: "",
  ctaHeadline: "Let's Build Together",
  ctaBody: "Looking for an AX engineer who actually ships? I'd love to chat.",
};
