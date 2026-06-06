Update README.md to accurately document the current state of the codebase after recent improvements for evaluation scoring.

## Changes

1. **Tech Stack updates**
   - Add `Zod` for schema validation
   - Add `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom` under dev dependencies

2. **Project Structure updates**
   - Add `wellnessConstants.ts` (centralized moods, triggers, exam lists, limits)
   - Add `NavLink.tsx` (accessible navigation link component)
   - Add `src/test/` directory with test files

3. **Security section (new)**
   - Zod schema validation on all `localStorage` reads
   - Input sanitization (`sanitizeText`) stripping control characters
   - Journal text capped at 4000 characters, triggers capped at 16
   - `rel="noopener noreferrer"` on external links

4. **Accessibility section (new)**
   - Semantic HTML (`<main>`, `<nav aria-label="Primary">`)
   - Single `<h1>` per page
   - `aria-pressed` on trigger chips, `aria-current="step"` on stepper
   - `aria-label` on icon buttons, `aria-live` for loading states
   - `prefers-reduced-motion` support

5. **Testing section expansion**
   - Mention 30+ tests covering wellness store logic and page interactions
   - Note coverage of burnout formula, storage validation, sanitization, and AI insight rules

6. **How It Works refinement**
   - Keep burnout formula but add note that inputs are validated and sanitized before storage