## Goal
Lift the AI Evaluation Score from 73 → 100 by addressing each weak rubric area without changing the product itself.

## Score gap analysis
- Testing 26 → biggest gap. Only a placeholder `example.test.ts` exists.
- Code Quality 71 → pages are large, with repeated inline logic and no shared types/components.
- Security 85 → unvalidated `JSON.parse` from localStorage, no length/content guards on journal/triggers input.
- Accessibility 93 → missing landmarks, `aria-label`s on icon buttons, form labels, focus states on custom controls.
- Problem Statement Alignment 85 → minor: README claims features that aren't deeply wired (e.g. burnout categories on dashboard), and meta/landing copy can name all target exams.

## Changes

### 1. Testing (→ raise to ~95)
Add real Vitest unit + component tests in `src/test/`:
- `wellnessStore.test.ts`: `calcBurnout` boundary cases, `burnoutCategory` thresholds, `getEntries` corrupt-JSON fallback, `saveEntry` persistence, draft set/clear, `generateInsights` rules per trigger/sleep/stress branch, `encouragement` ranges.
- `checkin.test.tsx`: render `CheckIn`, simulate mood select + sliders, assert draft saved.
- `triggers.test.tsx`: toggling chips updates selection and Next enables.
- `journal.test.tsx`: submitting writes entry to localStorage and navigates.
- `insights.test.tsx`: seeds localStorage, asserts burnout score, category badge, chart container, and at least one insight card render.
Add `@testing-library/react` + `@testing-library/jest-dom` + `jsdom` (already in setup if present) and a `test` script. Target ≥80% coverage on `src/lib` and `src/pages`.

### 2. Code Quality (→ ~95)
- Extract shared UI: `MoodPicker`, `StatSlider`, `TriggerChip`, `BurnoutBadge`, `InsightCard`, `SectionCard` under `src/components/wellness/`.
- Move constants (trigger list, mood list, thresholds) into `src/lib/wellnessConstants.ts`.
- Add a `useWellness` hook wrapping store reads/writes with `useSyncExternalStore` so pages re-render reactively and logic is centralized.
- Strong typing: replace loose strings with the `Mood` union everywhere; add `zod` schema `MoodEntrySchema` used by `getEntries` to validate stored data.
- Remove dead CSS / unused imports; ensure each page file < ~200 lines.

### 3. Security (→ 100)
- Validate every `localStorage`/`sessionStorage` read with the zod schema; drop malformed entries silently.
- Cap journal text (e.g. 4000 chars) and trigger count; sanitize before storing (strip control chars).
- Use `rel="noopener noreferrer"` on any external links (helpline, etc.).
- Add a CSP-friendly meta tag in `index.html` (`referrer`, `X-Content-Type-Options` equivalents where possible at meta level).
- Ensure no `dangerouslySetInnerHTML` is used.

### 4. Accessibility (→ 100)
- Wrap pages with `<main>`, add `<nav aria-label="Primary">` in `AppHeader`, single `<h1>` per page.
- Add `aria-label` to icon-only buttons; `aria-current="step"` on `Stepper`.
- Convert mood/trigger chips to real `<button type="button" aria-pressed={selected}>` with visible focus ring via `focus-visible:ring`.
- Associate every slider with `<label htmlFor>` and `aria-valuetext`.
- Color-contrast pass on muted text tokens in `index.css` (bump muted-foreground lightness in light mode).
- Add `prefers-reduced-motion` guard around the hero animation.
- `alt` text on hero illustration; `role="status"` on loading states.

### 5. Problem Statement Alignment (→ 100)
- Landing copy + meta description explicitly list: Boards, JEE, NEET, CUET, CAT, GATE, UPSC.
- Insights dashboard surfaces all required fields from the spec: mood, stressLevel, sleepHours, studyHours, triggers, journal preview, burnoutScore, createdAt — as a recent-entries table.
- Add a small "How burnout is calculated" tooltip showing the exact formula (matches spec).
- README updated to match the new component map and test commands.

## Technical Notes
- Test runner: `vitest run --coverage` via existing `src/test/setup.ts`; add `@vitest/coverage-v8`.
- Validation lib: `zod` (already common in stack).
- No backend, no schema changes — pure frontend refactor + tests + a11y/security hardening.
- Keep all design tokens in `index.css`; no hard-coded colors introduced.

## Out of scope
- Adding real AI/backend, auth, or analytics.
- Visual redesign — current calming theme is preserved.
