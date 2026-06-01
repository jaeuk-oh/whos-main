# AX Engineer Portfolio Redesign — Implementation Plan (Revised)

**Plan ID:** ax-portfolio-redesign
**Source spec:** `.omc/specs/deep-interview-ax-portfolio.md` (Ambiguity 15.2% — PASSED)
**Type:** Brownfield React rewrite (single-file App → componentized 3-section SPA)
**Mode:** Consensus (RALPLAN-DR, SHORT)
**Revision:** 2 (incorporates Architect + Critic ITERATE feedback)
**Generated:** 2026-05-26

---

## 1. RALPLAN-DR Summary

### Principles (5)
1. **Signal over noise** — every pixel reinforces "I build real AI agents." No filler.
2. **Evidence-first** — GitHub + live demo links visible above the fold.
3. **Minimal dependency footprint** — pure CSS + React only. No animation/UI/router libraries.
4. **Brownfield surgical edits** — keep `src/App.jsx`, `src/App.css`, `src/index.css` file shapes; rewrite contents.
5. **Placeholder-driven content** — code ships with clearly marked TODO slots; one data file edit post-handoff.

### Decision Drivers (top 3)
1. **5-second recognition test** — hiring manager sees "Jaeuk Oh · AX Engineer · AI agents" + ≥1 live demo link without scrolling at 1440×900.
2. **Build must produce deployable `docs/`** — Vite must emit to `docs/` with CNAME preserved for GitHub Pages custom domain.
3. **Creative ≠ chaotic** — animation budget enhances scanability; all motion gated behind `prefers-reduced-motion`.

### Options Considered

| Option | Description | Pros | Cons | Verdict |
|--------|-------------|------|------|---------|
| **A. Single `App.jsx` rewrite** | Keep everything inline | Smallest diff | Hard to read at 300+ lines | Rejected |
| **B. Componentized `src/components/`** (CHOSEN) | Extract sections + central `portfolio.js` | Clean separation; testable; single data file | ~10 new files | **Selected** |
| **C. Router + multi-page** | React Router + routes | Future-proof | Violates Non-Goals | Rejected |

### Why Option B
- Spec allows restructure, forbids migration. Componentization is restructure.
- Centralizes placeholder content in `src/data/portfolio.js`.
- Each section animates independently via isolated IntersectionObserver subscribers.

---

## 2. Step-by-Step Implementation Plan

### Step 1 — Project hygiene, deploy mechanics, scaffolding
**Files touched:**
- `vite.config.js` (edit)
- `index.html` (edit)
- `/CNAME` (DELETE) → `public/CNAME` (CREATE)
- `public/favicon.svg` (CREATE — simple letter "J" placeholder)
- `src/index.css` (rewrite — reset ONLY, no layout)
- new dirs: `src/components/`, `src/data/`, `src/hooks/`
- new: `src/data/portfolio.js`
- new: `src/hooks/useInView.js`

**Tasks:**
1. **vite.config.js**: Add `build: { outDir: 'docs', emptyOutDir: true }`. RETAIN `base: '/'` (custom domain, not project page).
2. **CNAME relocation**: Move repo-root `/CNAME` (contents: `www.whatonsolve.com`) to `public/CNAME`. **Delete root `/CNAME`**. Vite auto-copies `public/*` into `outDir`.
3. **index.html**:
   - `<html lang="en">` (already correct — verify).
   - `<title>Jaeuk Oh — AX Engineer</title>`.
   - Remove `<link rel="icon" ... vite.svg>`; replace with `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`.
   - Add `<meta name="description" content="Jaeuk Oh — AX Engineer building production AI agents with Claude, RAG, and tool use.">`.
   - Add OG/social meta: `og:title`, `og:description`, `og:type=website`, `og:url=https://www.whatonsolve.com`, `twitter:card=summary`.
4. **public/favicon.svg**: 32×32 SVG with letter "J" on gradient circle. ~10 lines inline SVG, no external deps.
5. **src/index.css** (RESET ONLY — no body layout, no `display: flex`, no `place-items`):
   - Universal `box-sizing: border-box`.
   - `:root` exposes design tokens (see §4).
   - `html, body { margin: 0; padding: 0; }`.
   - `body { font-family: ...; color: var(--text-0); background: var(--bg-0); }`.
   - **No `display:flex`, no `place-items:center`** — these moved to `App.css` if needed.
6. **src/data/portfolio.js**: Exports `profile`, `projects`, `skills`, `contact` per §5 schema.
7. **src/hooks/useInView.js**: IntersectionObserver hook returning `[ref, isInView]`. ~30 lines. **MUST call `observer.disconnect()` in cleanup.**

**Acceptance Criteria:**
- `npm run dev` boots, zero console errors.
- `vite.config.js` contains `build: { outDir: 'docs', emptyOutDir: true }` AND `base: '/'`.
- Repo-root `/CNAME` no longer exists; `public/CNAME` contains `www.whatonsolve.com`.
- `public/favicon.svg` exists; `index.html` has NO reference to `vite.svg`.
- `index.html` `<title>` = `Jaeuk Oh — AX Engineer`; description + OG meta present.
- `src/index.css` contains NO `display: flex` and NO `place-items` declarations on `body`.
- `useInView.js` cleanup function calls `observer.disconnect()`.
- `import { profile, projects, skills, contact } from './data/portfolio'` works.

---

### Step 2 — Rewrite `App.jsx` shell + decide scroll container
**Files touched:** `src/App.jsx`, `src/main.jsx` (verify only)

**Tasks:**
1. **StrictMode stays ON.** Do NOT modify `src/main.jsx`. `<StrictMode>` wrapper remains.
2. Strip `canScroll`/`currentPage`/`pages-wrapper` logic entirely.
3. New shape:
   ```
   <main className="app">
     <Hero />
     <Skills />
     <Contact />
     <NavDots />
   </main>
   ```
4. Add `<div className="bg-orbs" aria-hidden="true" />` inside `<main>` for animated background layer.
5. Remove legacy `<footer>`; contact info now lives in Contact section.
6. **Scroll container decision**: `<body>` is the ONLY scroll container. `scroll-snap-type: y proximity` lives ONLY on `body` (in `App.css`). `<html>`, `<main>`, `.app` do NOT get scroll-snap rules.

**Acceptance Criteria:**
- `App.jsx` ≤ 60 lines.
- No `useState`/`setTimeout` for scroll logic in `App.jsx`.
- All three sections render with placeholder data visible.
- `<StrictMode>` still wraps `<App />` in `main.jsx`.

---

### Step 3 — Build `Hero` + `ProjectCard` + signature interaction
**Files touched:**
- new: `src/components/Hero.jsx`, `src/components/Hero.css`
- new: `src/components/ProjectCard.jsx`, `src/components/ProjectCard.css`

**Tasks:**
1. `Hero.jsx` structure (component root class `.hero`):
   - `<section id="hero" className="hero">`
   - `<h1 className="hero__title">Jaeuk Oh</h1>`
   - `<div className="hero__chip">AX Engineer · AI Agent Engineer</div>`
   - `<p className="hero__tagline">{typedTagline}</p>` (typed animation, see #2 below)
   - `<p className="hero__bio">{profile.bio}</p>`
   - `<div className="hero__links">` — GitHub icon link + Email link + optional LinkedIn.
   - `<div className="hero__projects">` — maps `projects[]` to `<ProjectCard />`, max 3.

2. **Typing animation (StrictMode-safe pattern, REWRITE — do NOT reuse old closure):**
   ```js
   useEffect(() => {
     let cancelled = false;
     let i = 0;
     let acc = '';
     const type = () => {
       if (cancelled || i >= profile.tagline.length) return;
       acc += profile.tagline.charAt(i);
       setTyped(acc);
       i++;
       setTimeout(type, 80);
     };
     type();
     return () => { cancelled = true; };
   }, []);
   ```
   - `cancelled` flag prevents double-mount duplication under StrictMode.
   - No `useRef` guard; the flag itself is the contract.

3. **Signature interaction — cursor-tracking gradient mesh in Hero** (~30 lines vanilla JS):
   - `<div className="hero__cursor-glow" aria-hidden="true" />` absolutely positioned inside `.hero`.
   - `useEffect` attaches `mousemove` listener on the hero section root; updates CSS custom properties `--mx` and `--my` on `.hero` element.
   - CSS: `.hero__cursor-glow` uses `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(124,92,255,0.18), transparent 40%)`.
   - **Reduced-motion fallback**: under `@media (prefers-reduced-motion: reduce)`, `.hero__cursor-glow` becomes a static centered radial gradient; mousemove listener still attaches but the CSS ignores `--mx`/`--my` because the gradient is hard-coded to `50% 50%`.
   - **Keyboard/non-mouse fallback**: initial CSS values default to `50% 50%`. If no mousemove ever fires (touch/keyboard user), centered glow is the resting state — no functional regression.
   - **Cleanup**: `useEffect` return removes the listener.

4. `ProjectCard.jsx` props: `{ name, tagline, problem, solution, stack[], githubUrl, demoUrl }`.
   - Component root class `.project-card`. Sub-elements: `.project-card__title`, `.project-card__stack`, `.project-card__links`.
   - Glassy card; hover lift via `transition: transform, box-shadow`.
   - Two anchor buttons (GitHub, Live Demo). Empty-string URL → button hidden.
   - `stack[]` rendered as pill tags `.project-card__pill`.

5. Hero CSS animations: H1 `@keyframes fadeInUp` on mount; cards stagger via `animation-delay: calc(var(--i) * 120ms)` set inline.

**Acceptance Criteria:**
- Hero renders 1 name, 1 chip, 1 typing tagline, ≥2 project cards.
- Each card renders GitHub button when `githubUrl` non-empty; renders Demo button when `demoUrl` non-empty; hides button when URL is `""`.
- Tagline letters accumulate (not overwrite) over ~1.5s.
- Typing effect does NOT duplicate characters under StrictMode dev double-mount.
- Cursor-tracking glow visible and follows mouse on desktop.
- Reduced-motion: glow becomes static centered gradient; no animation runs.
- Component CSS uses BEM-ish class names only (`.hero__*`, `.project-card__*`); no element selectors cross component boundaries.

---

### Step 4 — Build `Skills` section
**Files touched:** new: `src/components/Skills.jsx`, `src/components/Skills.css`

**Tasks:**
1. Component root class `.skills`. Sub-elements: `.skills__column`, `.skills__heading`, `.skills__pill`.
2. Two-column desktop / stacked mobile:
   - Column A "AI / LLM": Claude API, OpenAI API, RAG, Tool Use, Multi-Agent, LangChain, LangGraph, MCP, Prompt Engineering, Vector DBs.
   - Column B "Engineering": Python, TypeScript, JavaScript, React, Node.js, FastAPI, Docker, Git, REST APIs, WebSockets.
3. Pills wrap; subtle gradient border per pill.
4. Section heading "Skills & Tech Stack" uppercase, gradient text via `background-clip: text`.
5. Scroll-triggered reveal via `useInView` — pills cascade-fade with `transition-delay: calc(var(--i) * 40ms)`.
6. Section uses `min-height: 100vh` for rhythm; content may exceed on mobile.

**Acceptance Criteria:**
- "Claude API" and "RAG" pills present in DOM text.
- Zero Korean characters in section.
- Pills animate in when scrolled into view.
- Under reduced-motion: pills appear instantly (no cascade).

---

### Step 5 — Build `Contact` + `NavDots` + finalize `App.css`
**Files touched:**
- new: `src/components/Contact.jsx`, `src/components/Contact.css`
- new: `src/components/NavDots.jsx`, `src/components/NavDots.css`
- `src/App.css` (full rewrite — layout, bg orbs, scroll, reduced-motion)

**Tasks:**
1. `Contact.jsx` (root class `.contact`):
   - Heading: `Let's Build Together` (in `.contact__heading`).
   - One-sentence CTA body.
   - Primary CTA: `mailto:` button styled `.contact__cta`.
   - Secondary links: GitHub, optional LinkedIn.
   - Static footer line: `© 2026 Jaeuk Oh` in `.contact__footer`. **NOT** `position: fixed`.

2. `NavDots.jsx` (root class `.nav-dots`):
   - 3 vertical dots, right edge, desktop only (`@media (min-width: 768px)`).
   - Each dot = `<button>` with `aria-label="Jump to {section}"` and `aria-current="true"` when active.
   - **Keyboard nav**: each button is focusable (default `<button>` behavior); Tab cycles through; Enter/Space triggers `element.scrollIntoView({behavior:'smooth'})`. Visible `:focus-visible` outline.
   - Active state derived from shared IntersectionObserver (or per-section observers).
   - Click/Enter → smooth scroll to section.

3. **`src/App.css` full rewrite** — global layout owner:
   - `body` rules ONLY in `App.css` (NOT in `index.css`):
     - `body { min-height: 100vh; background: linear-gradient(180deg, var(--bg-0), var(--bg-1)); scroll-snap-type: y proximity; overflow-x: hidden; }`
   - `html { scroll-behavior: smooth; }`
   - `.app { position: relative; width: 100%; }`
   - `.bg-orbs`: two `position: absolute` blurred radial gradients, `@keyframes float` 22s.
   - Each section (`.hero`, `.skills`, `.contact`): `min-height: 100vh; scroll-snap-align: start;`
   - Typography scale + responsive breakpoints (`1024px`, `768px`, `480px`).
   - **Reduced-motion block**:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, *::before, *::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
         scroll-behavior: auto !important;
       }
       body { scroll-snap-type: none; }
       .hero__cursor-glow { background: radial-gradient(circle at 50% 50%, rgba(124,92,255,0.12), transparent 50%); }
     }
     ```

**Acceptance Criteria:**
- Contact section: visible `mailto:` button + GitHub anchor.
- Footer text `© 2026 Jaeuk Oh` exists and is NOT `position: fixed`.
- NavDots visible at ≥768px, hidden below.
- Each NavDot button is keyboard-focusable, has `aria-label`, and triggers smooth scroll on Enter/Space.
- `body` declaration appears in `App.css` ONLY (zero `body { ... }` rules in `index.css`).
- `scroll-snap-type` declared ONLY on `body` (zero matches on `html`/`main`/`.app`).
- Reduced-motion media query disables orb float, pill cascade, and cursor glow tracking.

---

### Step 6 — Verification, lint, build, deploy smoke-test
**Files touched:** any CSS file for fixes only.

**Tasks:**
1. DevTools responsive check: 1440, 1024, 768, 480 widths — no horizontal scroll.
2. Keyboard-only nav: Tab through hero links → project card links → NavDots → contact links. All focusable, all have visible focus ring.
3. Korean character grep: `grep -rP '[\x{AC00}-\x{D7AF}\x{1100}-\x{11FF}\x{3130}-\x{318F}]' src/ index.html` → expect zero matches in user-facing strings.
4. `npm run lint` → zero errors, zero warnings.
5. `npm run build` → exit 0.
6. **Build artifact verification**:
   - `docs/index.html` exists.
   - `docs/index.html` contains a reference matching `/assets/index-[A-Za-z0-9_-]+\.js`.
   - `docs/CNAME` exists and content equals `www.whatonsolve.com`.
   - `docs/favicon.svg` exists.
   - NO `docs/vite.svg` references in `docs/index.html`.
7. `npm run preview` → site loads, all 3 sections render, zero console errors.
8. `prefers-reduced-motion` test: enable OS setting (macOS: Reduce Motion); confirm animations stop, cursor glow becomes static.

**Acceptance Criteria:**
- All 8 spec criteria (see §7) verified.
- `docs/` contains `index.html`, `assets/`, `CNAME`, `favicon.svg`.
- `npm run lint` passes with zero warnings.
- `npm run preview` renders all 3 sections without console errors.
- Reduced-motion preference honored across all animations.

---

## 3. Component Structure

```
src/
├── main.jsx                  (UNCHANGED — StrictMode wrapper preserved)
├── App.jsx                   (rewritten — ~50 lines, shell only)
├── App.css                   (rewritten — body, layout, bg orbs, scroll, reduced-motion)
├── index.css                 (rewritten — RESET + :root tokens ONLY, no body layout)
├── data/
│   └── portfolio.js          (NEW — all placeholder content)
├── hooks/
│   └── useInView.js          (NEW — IntersectionObserver hook, disconnect in cleanup)
└── components/
    ├── Hero.jsx + Hero.css
    ├── ProjectCard.jsx + ProjectCard.css
    ├── Skills.jsx + Skills.css
    ├── Contact.jsx + Contact.css
    └── NavDots.jsx + NavDots.css
public/
├── CNAME                     (NEW — moved from repo root)
└── favicon.svg               (NEW — replaces vite.svg)
```

**Data flow:** `portfolio.js` imported directly by each component (no prop drilling).

---

## 4. CSS Contract & Animation Strategy

### CSS Specificity Contract (executor must follow)
- **BEM-ish class names** only: `.hero__title`, `.project-card__stack`, `.skills__pill`, `.contact__cta`, `.nav-dots__dot`.
- **No element selectors crossing component boundaries** — e.g., NEVER `.hero h1 {}` in `App.css`; instead `.hero__title {}` in `Hero.css`.
- **Component root class** is `.{component-kebab}` (e.g., `Hero` → `.hero`, `ProjectCard` → `.project-card`).
- `index.css` is RESET + tokens only. `App.css` owns body + global layout. Per-component CSS owns that component only.
- `body { ... }` rules appear in exactly ONE file (`App.css`).
- `scroll-snap-type` declared on exactly ONE element (`body`).

### Design tokens (in `:root` in `index.css`)
```
--bg-0: #0a0a14;          /* deepest */
--bg-1: #0f0f1c;          /* surface */
--bg-2: #161629;          /* card */
--accent-1: #7c5cff;      /* violet */
--accent-2: #00d4ff;      /* cyan */
--accent-grad: linear-gradient(135deg, var(--accent-1), var(--accent-2));
--text-0: #f5f5fa;
--text-muted: #a0a0b8;
--radius: 14px;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--dur-fast: 200ms;
--dur-med: 600ms;
--dur-slow: 1200ms;
```

### Animation inventory
| # | What | Where | Mechanism | Duration |
|---|------|-------|-----------|----------|
| 1 | Background gradient orbs | `.bg-orbs` in App | `@keyframes float` | 22s loop |
| 2 | Hero H1 fade + slide up | `.hero__title` | `@keyframes fadeInUp` | 800ms |
| 3 | Tagline typing | `.hero__tagline` | JS setTimeout w/ cancelled flag | ~1.5s |
| 4 | Title chip shimmer | `.hero__chip` | `@keyframes shimmer` | 4s loop |
| 5 | Cursor-tracking glow (signature) | `.hero__cursor-glow` | JS mousemove → CSS custom props | live |
| 6 | Project card stagger-in | `.project-card` | `animation-delay: calc(var(--i) * 120ms)` | 700ms each |
| 7 | Project card hover lift | `.project-card:hover` | `transition` | 250ms |
| 8 | Skill pill cascade | `.skills__pill.is-visible` | `useInView` + `transition-delay` | 500ms each |
| 9 | Section heading gradient text | All `__heading` | `background-clip: text` + `hueShift` | 8s loop |
| 10 | NavDot active indicator | `.nav-dots__dot[aria-current]` | `transform: scale()` | 200ms |

### Reduced motion override
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  body { scroll-snap-type: none; }
  .hero__cursor-glow {
    background: radial-gradient(circle at 50% 50%, rgba(124,92,255,0.12), transparent 50%);
  }
}
```

### Responsive breakpoints
- **≥1024px:** 3-column project row, NavDots visible, large hero.
- **768–1023px:** 2-column project row, NavDots visible.
- **480–767px:** 1-column stack, NavDots hidden, scaled hero.
- **<480px:** tighter padding, smaller pill text.

---

## 5. `portfolio.js` Schema (JSDoc)

```js
/**
 * @typedef {Object} Profile
 * @property {string} name      - Required. Full display name.
 * @property {string} title     - Required. Primary role title (e.g., "AX Engineer").
 * @property {string} subtitle  - Required. Secondary descriptor.
 * @property {string} tagline   - Required. Animated typing line (≤60 chars).
 * @property {string} bio       - Required. 1-2 sentence positioning paragraph.
 */

/**
 * @typedef {Object} Project
 * @property {string} id         - Required. Stable key.
 * @property {string} name       - Required. Display name.
 * @property {string} tagline    - Required. One-line hook.
 * @property {string} problem    - Required. Problem statement.
 * @property {string} solution   - Required. Solution summary.
 * @property {string[]} stack    - Required. Tech tags (≥1).
 * @property {string} githubUrl  - Required. Empty string "" hides button.
 * @property {string} demoUrl    - Required. Empty string "" hides button.
 */

/**
 * @typedef {Object} Skills
 * @property {string[]} ai          - Required. AI/LLM skill list (≥1).
 * @property {string[]} engineering - Required. Engineering skill list (≥1).
 */

/**
 * @typedef {Object} Contact
 * @property {string} email       - Required. Used in mailto:.
 * @property {string} github      - Required. Full URL.
 * @property {string} linkedin    - Optional. "" hides link.
 * @property {string} ctaHeadline - Required. Section heading.
 * @property {string} ctaBody     - Required. CTA body copy.
 */
```

### Placeholder content (TODO sentinels)
```js
export const profile = {
  name: "Jaeuk Oh",
  title: "AX Engineer",
  subtitle: "AI Agent Engineer",
  tagline: "I build AI agents that ship.",
  bio: "Building production AI agents with Claude, RAG, and tool use. // TODO: refine to 1-2 sentences.",
};

export const projects = [
  {
    id: "project-1",
    name: "// TODO: Project Name 1",
    tagline: "One-line hook (problem → outcome).",
    problem: "What problem it solves.",
    solution: "How the agent solves it (Claude + RAG + Tool X).",
    stack: ["Claude API", "Python", "RAG"],
    githubUrl: "https://github.com/jaeuk-oh/__PLACEHOLDER__",
    demoUrl: "https://__PLACEHOLDER__.example.com",
  },
  {
    id: "project-2",
    name: "// TODO: Project Name 2",
    tagline: "One-line hook.",
    problem: "...",
    solution: "...",
    stack: ["LangGraph", "TypeScript", "Tool Use"],
    githubUrl: "https://github.com/jaeuk-oh/__PLACEHOLDER__",
    demoUrl: "",
  },
  {
    id: "project-3",
    name: "// TODO: Project Name 3",
    tagline: "One-line hook.",
    problem: "...",
    solution: "...",
    stack: ["Multi-Agent", "React", "OpenAI"],
    githubUrl: "https://github.com/jaeuk-oh/__PLACEHOLDER__",
    demoUrl: "https://__PLACEHOLDER__.example.com",
  },
];

export const skills = {
  ai: ["Claude API", "OpenAI API", "RAG", "Tool Use", "Multi-Agent", "LangChain", "LangGraph", "MCP", "Prompt Engineering", "Vector DBs"],
  engineering: ["Python", "TypeScript", "JavaScript", "React", "Node.js", "FastAPI", "Docker", "Git", "REST APIs", "WebSockets"],
};

export const contact = {
  email: "jaeuk.oh@whatonsolve.com",   // TODO: confirm canonical email
  github: "https://github.com/jaeuk-oh",
  linkedin: "",                         // optional — "" hides
  ctaHeadline: "Let's Build Together",
  ctaBody: "Looking for an AX engineer who actually ships? I'd love to chat.",
};
```

**TODO pattern:** All placeholder strings use `// TODO:` or `__PLACEHOLDER__` so they are greppable and visually loud if shipped.

---

## 6. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|-----------|
| R1 | `npm run build` outputs to `dist/` not `docs/` | HIGH | HIGH | Step 1 adds `build.outDir: 'docs'` + `emptyOutDir: true`. Step 6 verifies. |
| R2 | `CNAME` lost during build | MED | HIGH | Move to `public/CNAME` in Step 1; Vite auto-copies. Step 6 verifies `docs/CNAME`. |
| R3 | Smooth-scroll + scroll-snap conflict on Safari | MED | MED | `scroll-snap-type: y proximity` (not mandatory); Safari smoke test in Step 6. |
| R4 | Real project URLs unknown | HIGH | LOW | `__PLACEHOLDER__` sentinel URLs; AC2 verifies link structure, not real URLs. |
| R5 | Korean characters leak into UI | LOW | MED | Step 6 Hangul grep. |
| R6 | Bundle bloat from many CSS files | LOW | LOW | Vite tree-shakes; monitor `npm run build` size output. |
| R7 | Typing animation duplicates under StrictMode double-mount | MED | LOW | StrictMode-safe `cancelled` flag pattern in Step 3 (rewrite — no closure reuse). Accumulator `acc` avoids overwrite. |
| R8 | NavDots IntersectionObserver thrashing | LOW | LOW | `rootMargin: '-40% 0px -40% 0px'`. |
| R9 | Accessibility regressions: contrast, focus rings | MED | MED | Gradient text contrast ≥ 4.5:1 against `--bg-0`; `:focus-visible` outline on all buttons/links. |
| R10 | Stale references to removed `currentPage`/`canScroll` | LOW | LOW | Full rewrite in Step 2; lint catches unused vars. |
| R11 | `body` declaration duplicated between `index.css` and `App.css` | MED | MED | Step 1 + Step 5 enforce: `index.css` = reset/tokens only; `App.css` = sole owner of `body { ... }`. Lint via grep in Step 6. |
| R12 | `useInView` observer leaks (no disconnect) | MED | LOW | Hook contract: cleanup MUST call `observer.disconnect()`. Step 1 AC verifies. |
| R13 | `vite.svg` favicon 404s post-rewrite | LOW | LOW | Step 1 replaces with `public/favicon.svg` + updates `index.html`. Step 6 verifies. |
| R14 | NavDots inaccessible via keyboard | MED | MED | Use semantic `<button>`, `aria-label`, `aria-current`, `:focus-visible`. Step 5 AC enforces. |
| R15 | Deploy broken — wrong `base` for custom domain | MED | HIGH | Retain `base: '/'` (custom domain, NOT GitHub project page). Step 1 AC verifies. |

**Rollback procedure:** `git revert <commit-sha>` on the merge/squash commit that landed this redesign. No DB, no infra, no data migration — pure file-level rollback restores the previous portfolio instantly. Document the target SHA in the PR description for one-command rollback.

---

## 7. Spec Acceptance Criteria Verification

Mapped 1:1 to spec's 8 criteria.

| # | Criterion | Verification |
|---|-----------|--------------|
| AC1 | "AI agent engineer" identifiable in 5s | Load at 1440×900; verify name + chip + subtitle + ≥1 project card with "Claude"/"Agent" stack tag visible without scrolling. |
| AC2 | ≥1 GitHub + ≥1 demo link in hero | `document.querySelectorAll('.hero a[href*="github.com"]').length >= 1` AND `document.querySelectorAll('.hero a[href^="https://"]:not([href*="github.com"]):not([href^="mailto:"])').length >= 1`. |
| AC3 | AI/LLM skills (Claude API, RAG) listed | DOM text in `.skills` includes "Claude API" AND "RAG". |
| AC4 | Contact CTA flows naturally | `.contact` has `<a href^="mailto:">` button + `<a href*="github.com/jaeuk-oh">`. Click mailto opens OS mail handler. |
| AC5 | Mobile responsive at 480/768 | DevTools responsive: 768 → 2-col or stacked, no horizontal scroll. 480 → 1-col, NavDots hidden, no horizontal scroll, legible. |
| AC6 | `npm run build` → `docs/` deployable | Exit 0; `docs/index.html` references `/assets/index-*.js`; `docs/CNAME` = `www.whatonsolve.com`; `npm run preview` renders all 3 sections without console errors. |
| AC7 | Animations/transitions present | Watch orbs float, tagline type, cards stagger, pills cascade, card hover lift, cursor glow follows mouse. |
| AC8 | English only — no Korean UI text | `grep -rP '[\x{AC00}-\x{D7AF}\x{1100}-\x{11FF}\x{3130}-\x{318F}]' src/ index.html` → zero matches in user-facing strings. |

### Additional Acceptance Criteria (Architect/Critic-mandated)

| # | Criterion | Verification |
|---|-----------|--------------|
| AC9 | StrictMode stays ON | `src/main.jsx` contains `<StrictMode>` wrapping `<App />` post-rewrite. |
| AC10 | `prefers-reduced-motion` honored | OS-level Reduce Motion enabled → orbs stop, pills appear instantly, cursor glow becomes static centered, scroll-snap disabled, typing reduces. |
| AC11 | Keyboard navigation works | Tab cycles through all interactive elements (hero links, card buttons, NavDots, contact CTA). Visible `:focus-visible` outline. Enter/Space activates NavDots and triggers smooth scroll. |
| AC12 | Lint passes | `npm run lint` → exit 0, zero warnings. |
| AC13 | Mobile parity at 480px | All content readable, no overflow, NavDots hidden, tap targets ≥44×44px. |
| AC14 | CSS specificity contract | Zero element selectors crossing component boundaries (e.g., no `.hero h1`, `.skills span` in any CSS). Class names follow BEM-ish convention. |
| AC15 | Single scroll container | `scroll-snap-type` appears on exactly ONE selector (`body`) across all CSS files. |
| AC16 | Single `body` owner | `body { ... }` rules appear in `App.css` only; `index.css` has zero `body` selectors. |
| AC17 | `useInView` cleanup | Hook's `useEffect` return calls `observer.disconnect()`. |
| AC18 | Favicon replaced | `index.html` references `/favicon.svg`; no reference to `vite.svg`. |
| AC19 | OG meta present | `index.html` contains `og:title`, `og:description`, `og:type`, `og:url`, `twitter:card` meta tags. |
| AC20 | CNAME in correct location | Repo-root `/CNAME` absent; `public/CNAME` present with content `www.whatonsolve.com`. |

---

## 8. ADR (Architecture Decision Record)

**Decision:** Componentize into `src/components/{Hero,Skills,Contact,ProjectCard,NavDots}` with shared content in `src/data/portfolio.js`. Pure CSS, per-component stylesheets, BEM-ish naming. Vite emits to `docs/` for GitHub Pages with CNAME via `public/`. One vanilla-JS signature interaction (cursor-tracking gradient mesh) in Hero.

**Decision drivers:**
1. 5-second recognition test demands tight above-the-fold layout — easier to iterate when Hero is isolated.
2. Spec mandates pure CSS rewrite — rules out CSS-in-JS and Tailwind.
3. Brownfield Non-Goals forbid routing libs.
4. Deploy mechanics (GitHub Pages + custom domain) require `outDir: 'docs'` and `public/CNAME` discipline.
5. Creative differentiation needs ≥1 memorable interaction without violating "no animation library" constraint.

**Alternatives considered:**
- **A. Single `App.jsx` rewrite** — rejected: readability tax + animation hooks tangled.
- **C. Router + multi-page** — rejected: explicit Non-Goal in spec.
- **Scroll container on `<html>`** — rejected: `<body>` is the conventional default and keeps `scroll-snap-type` co-located with the page background; choosing one element (body) prevents specificity conflicts.
- **JS animation library (Framer Motion, GSAP)** — rejected: explicit Non-Goal; CSS + minimal JS suffices for required effects.

**Why chosen:** Smallest viable structural change that achieves separation of concerns, supports section-level animation hooks, isolates placeholder content, satisfies all spec ACs, and adds ONE high-impact signature interaction without violating the no-library constraint.

**Consequences:**
- (+) Each section independently testable and visually iterable.
- (+) Jaeuk edits one data file post-handoff for real content.
- (+) Future skill list updates are one-line edits.
- (+) Deploy is deterministic — `npm run build` → push → live.
- (+) Rollback is one `git revert`.
- (−) ~10 new files (offset by per-file simplicity).
- (−) Slight Vite cold-start increase (negligible).
- (−) Cursor-tracking glow adds ~30 lines of JS in Hero (acceptable per Architect spec).

**Follow-ups (out of scope):**
- Real project content fill-in by Jaeuk after live demos confirmed.
- Optional analytics (Plausible/Vercel).
- Optional OG image asset (meta tags shipped; image file is a follow-up).
- Optional dark/light toggle — spec is dark-only.

---

## 9. Open Questions

Tracked in `.omc/plans/open-questions.md`:

- [ ] Canonical contact email — is `jaeuk.oh@whatonsolve.com` correct? — Affects Contact CTA.
- [ ] Confirm 2 or 3 project cards in hero — spec says "2~3개", placeholder defaults to 3. — Affects hero density.
- [ ] LinkedIn URL — include or omit? Placeholder is `""` (omitted). — Affects contact link count.
- [ ] Real GitHub repo URLs + live demo URLs for ≥2 projects — required for AC2 to fully pass in production (not blocking plan completion).
- [ ] OG image asset (`/og-image.png` 1200×630) — meta tags reference URL; image file is post-handoff follow-up.

---

## 10. Handoff

**Next action when approved:** `/oh-my-claudecode:start-work ax-portfolio-redesign`

**Executor model recommendation:** `sonnet` (standard rewrite, no novel architecture).

**Estimated complexity:** MEDIUM
- ~12 new files (10 components/data/hooks + `public/favicon.svg` + `public/CNAME`)
- 3 rewritten files (`App.jsx`, `App.css`, `index.css`)
- 2 edited config files (`vite.config.js`, `index.html`)
- 1 file deleted (`/CNAME` at repo root)
- ~500-700 lines of new code total (mostly CSS)
- No new dependencies
- Rollback: single `git revert <sha>`

---
